import { Router, Request, Response, NextFunction } from 'express';
import { petService } from '../services/petService';
import { CriarPetDTO, AtualizarPetDTO, FiltrosPet, TipoPet } from '../models/pet';
import { validarUUID, validarFiltros } from '../utils/validators';

/**
 * Router contendo todas as rotas relacionadas a Pets
 * 
 * Rotas disponíveis:
 * - POST /pets - Cria um novo pet
 * - GET /pets - Lista todos os pets (com filtros opcionais)
 * - GET /pets/:id - Busca um pet específico
 * - PUT /pets/:id - Atualiza um pet
 * - DELETE /pets/:id - Remove um pet
 */
export const petRouter = Router();

/**
 * @route POST /pets
 * @description Cria um novo pet no sistema
 * @access Public
 * 
 * @body {CriarPetDTO} - Dados do pet
 * @returns {Pet} 201 - Pet criado com sucesso
 * @returns {ErroResposta} 400 - Dados inválidos
 */
petRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dados: CriarPetDTO = req.body;
    const novoPet = petService.criarPet(dados);
    
    // Retorna 201 (Created) com o pet criado
    res.status(201).json(novoPet);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @route GET /pets
 * @description Lista todos os pets com filtros opcionais
 * @access Public
 * 
 * @queryparam {string} tipo - Filtro por tipo (cachorro, gato, ave, outro)
 * @queryparam {number} idade - Filtro por idade
 * @returns {Pet[]} 200 - Lista de pets
 * @returns {ErroResposta} 400 - Filtros inválidos
 */
petRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filtros: FiltrosPet = {};

    // Processa filtro por tipo
    if (req.query.tipo) {
      filtros.tipo = req.query.tipo as TipoPet;
    }

    // Processa filtro por idade
    if (req.query.idade) {
      filtros.idade = parseInt(req.query.idade as string, 10);
    }

    // Valida os filtros
    if (Object.keys(filtros).length > 0) {
      validarFiltros(filtros);
    }

    const pets = petService.listarPets(filtros);
    
    // Retorna 200 (OK) com a lista de pets
    res.status(200).json(pets);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @route GET /pets/:id
 * @description Busca um pet específico pelo ID
 * @access Public
 * 
 * @param {string} id - UUID do pet
 * @returns {Pet} 200 - Pet encontrado
 * @returns {ErroResposta} 400 - ID inválido
 * @returns {ErroResposta} 404 - Pet não encontrado
 */
petRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Valida formato do UUID
    if (!validarUUID(id)) {
      return res.status(400).json({
        erro: 'ID_INVALIDO',
        mensagem: 'O ID fornecido não é um UUID válido'
      });
    }

    const pet = petService.buscarPetPorId(id);
    
    // Retorna 200 (OK) com o pet
    res.status(200).json(pet);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @route PUT /pets/:id
 * @description Atualiza um pet existente (atualização parcial permitida)
 * @access Public
 * 
 * @param {string} id - UUID do pet
 * @body {AtualizarPetDTO} - Dados a serem atualizados
 * @returns {Pet} 200 - Pet atualizado com sucesso
 * @returns {ErroResposta} 400 - Dados ou ID inválidos
 * @returns {ErroResposta} 404 - Pet não encontrado
 */
petRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Valida formato do UUID
    if (!validarUUID(id)) {
      return res.status(400).json({
        erro: 'ID_INVALIDO',
        mensagem: 'O ID fornecido não é um UUID válido'
      });
    }

    const dados: AtualizarPetDTO = req.body;
    const petAtualizado = petService.atualizarPet(id, dados);
    
    // Retorna 200 (OK) com o pet atualizado
    res.status(200).json(petAtualizado);
  } catch (erro) {
    next(erro);
  }
});

/**
 * @route DELETE /pets/:id
 * @description Remove um pet do sistema
 * @access Public
 * 
 * @param {string} id - UUID do pet
 * @returns 204 - Pet removido com sucesso (sem conteúdo)
 * @returns {ErroResposta} 400 - ID inválido
 * @returns {ErroResposta} 404 - Pet não encontrado
 */
petRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Valida formato do UUID
    if (!validarUUID(id)) {
      return res.status(400).json({
        erro: 'ID_INVALIDO',
        mensagem: 'O ID fornecido não é um UUID válido'
      });
    }

    petService.deletarPet(id);
    
    // Retorna 204 (No Content) - deleção bem-sucedida sem corpo na resposta
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
});
