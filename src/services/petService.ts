import { v4 as uuidv4 } from 'uuid';
import { Pet, CriarPetDTO, AtualizarPetDTO, FiltrosPet } from '../models/pet';
import { petStorage } from '../storage/petStorage';
import { validarCriacaoPet, validarAtualizacaoPet, ErroValidacao } from '../utils/validators';

/**
 * Classe de erro personalizada para recurso não encontrado
 * Facilita o tratamento de erros 404 na camada de controller
 */
export class ErroRecursoNaoEncontrado extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErroRecursoNaoEncontrado';
  }
}

/**
 * Service responsável pela lógica de negócio dos Pets
 * Contém todas as regras de negócio e validações
 * 
 * Camadas da arquitetura:
 * Controller -> Service -> Storage
 */
class PetService {
  
  /**
   * Cria um novo pet no sistema
   * 
   * Regras de negócio:
   * - Valida todos os campos obrigatórios
   * - Gera UUID automático
   * - Define datas de criação e atualização
   * 
   * @param dados - Dados do pet a ser criado
   * @returns Pet criado com ID e datas geradas
   * @throws ErroValidacao se dados inválidos
   */
  criarPet(dados: CriarPetDTO): Pet {
    // Valida os dados de entrada
    validarCriacaoPet(dados);

    // Cria o pet com campos gerados automaticamente
    const novoPet: Pet = {
      id: uuidv4(),
      nome: dados.nome.trim(),
      tipo: dados.tipo,
      idade: dados.idade,
      raca: dados.raca?.trim(),
      nomeDono: dados.nomeDono?.trim(),
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };

    // Salva no storage
    petStorage.salvar(novoPet);

    return novoPet;
  }

  /**
   * Lista todos os pets com filtros opcionais
   * 
   * Filtros disponíveis:
   * - tipo: filtra por tipo de pet (cachorro, gato, ave, outro)
   * - idade: filtra por idade exata
   * 
   * @param filtros - Filtros opcionais para busca
   * @returns Array de pets que atendem aos critérios
   */
  listarPets(filtros?: FiltrosPet): Pet[] {
    return petStorage.listarTodos(filtros);
  }

  /**
   * Busca um pet específico pelo ID
   * 
   * @param id - UUID do pet
   * @returns Pet encontrado
   * @throws ErroRecursoNaoEncontrado se pet não existe
   */
  buscarPetPorId(id: string): Pet {
    const pet = petStorage.buscarPorId(id);

    if (!pet) {
      throw new ErroRecursoNaoEncontrado(`Pet com ID '${id}' não foi encontrado`);
    }

    return pet;
  }

  /**
   * Atualiza um pet existente
   * 
   * Regras de negócio:
   * - Pet deve existir
   * - Valida apenas os campos fornecidos
   * - Permite atualização parcial
   * - Atualiza automaticamente o campo 'atualizadoEm'
   * 
   * @param id - UUID do pet a ser atualizado
   * @param dados - Dados a serem atualizados (parcial)
   * @returns Pet atualizado
   * @throws ErroRecursoNaoEncontrado se pet não existe
   * @throws ErroValidacao se dados inválidos
   */
  atualizarPet(id: string, dados: AtualizarPetDTO): Pet {
    // Verifica se o pet existe
    const petExistente = petStorage.buscarPorId(id);
    if (!petExistente) {
      throw new ErroRecursoNaoEncontrado(`Pet com ID '${id}' não foi encontrado`);
    }

    // Valida os dados de atualização
    validarAtualizacaoPet(dados);

    // Mescla os dados existentes com os novos
    // Apenas os campos fornecidos são atualizados
    const petAtualizado: Pet = {
      ...petExistente,
      nome: dados.nome?.trim() ?? petExistente.nome,
      tipo: dados.tipo ?? petExistente.tipo,
      idade: dados.idade ?? petExistente.idade,
      raca: dados.raca !== undefined ? dados.raca?.trim() : petExistente.raca,
      nomeDono: dados.nomeDono !== undefined ? dados.nomeDono?.trim() : petExistente.nomeDono,
      atualizadoEm: new Date().toISOString()
    };

    // Atualiza no storage
    petStorage.atualizar(id, petAtualizado);

    return petAtualizado;
  }

  /**
   * Remove um pet do sistema
   * 
   * @param id - UUID do pet a ser removido
   * @throws ErroRecursoNaoEncontrado se pet não existe
   */
  deletarPet(id: string): void {
    // Verifica se o pet existe antes de deletar
    if (!petStorage.existe(id)) {
      throw new ErroRecursoNaoEncontrado(`Pet com ID '${id}' não foi encontrado`);
    }

    petStorage.deletar(id);
  }

  /**
   * Retorna estatísticas básicas sobre os pets
   * Útil para testes e monitoramento
   * 
   * @returns Objeto com estatísticas
   */
  obterEstatisticas(): { total: number } {
    return {
      total: petStorage.contar()
    };
  }
}

// Exporta uma instância única do service (Singleton)
export const petService = new PetService();
