import { CriarPetDTO, AtualizarPetDTO, TipoPet } from '../models/pet';

/**
 * Classe customizada para erros de validação
 * Permite identificar facilmente erros de validação e tratá-los adequadamente
 */
export class ErroValidacao extends Error {
  constructor(message: string, public detalhes?: any) {
    super(message);
    this.name = 'ErroValidacao';
  }
}

/**
 * Valida se uma string é um UUID v4 válido
 * @param id - String a ser validada
 * @returns true se for UUID válido, false caso contrário
 */
export function validarUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Valida os dados para criação de um novo pet
 * Lança ErroValidacao se algum campo for inválido
 * 
 * Regras de validação:
 * - nome: obrigatório, não pode ser vazio
 * - tipo: obrigatório, deve ser um dos valores do enum TipoPet
 * - idade: obrigatório, deve ser >= 0
 * 
 * @param dados - Dados do pet a serem validados
 * @throws ErroValidacao se dados inválidos
 */
export function validarCriacaoPet(dados: any): asserts dados is CriarPetDTO {
  // Valida campo 'nome'
  if (!dados.nome) {
    throw new ErroValidacao("O campo 'nome' é obrigatório");
  }

  if (typeof dados.nome !== 'string') {
    throw new ErroValidacao("O campo 'nome' deve ser uma string");
  }

  if (dados.nome.trim().length === 0) {
    throw new ErroValidacao("O campo 'nome' não pode ser vazio");
  }

  if (dados.nome.length > 100) {
    throw new ErroValidacao("O campo 'nome' deve ter no máximo 100 caracteres");
  }

  // Valida campo 'tipo'
  if (!dados.tipo) {
    throw new ErroValidacao("O campo 'tipo' é obrigatório");
  }

  const tiposValidos = Object.values(TipoPet);
  if (!tiposValidos.includes(dados.tipo)) {
    throw new ErroValidacao(
      `O campo 'tipo' deve ser um dos seguintes valores: ${tiposValidos.join(', ')}`,
      { tiposValidos }
    );
  }

  // Valida campo 'idade'
  if (dados.idade === undefined || dados.idade === null) {
    throw new ErroValidacao("O campo 'idade' é obrigatório");
  }

  if (typeof dados.idade !== 'number') {
    throw new ErroValidacao("O campo 'idade' deve ser um número");
  }

  if (dados.idade < 0) {
    throw new ErroValidacao("O campo 'idade' não pode ser negativo");
  }

  if (dados.idade > 150) {
    throw new ErroValidacao("O campo 'idade' deve ser um valor realista (máximo 150 anos)");
  }

  if (!Number.isInteger(dados.idade)) {
    throw new ErroValidacao("O campo 'idade' deve ser um número inteiro");
  }

  // Valida campos opcionais se fornecidos
  if (dados.raca !== undefined && dados.raca !== null) {
    if (typeof dados.raca !== 'string') {
      throw new ErroValidacao("O campo 'raca' deve ser uma string");
    }
    if (dados.raca.length > 100) {
      throw new ErroValidacao("O campo 'raca' deve ter no máximo 100 caracteres");
    }
  }

  if (dados.nomeDono !== undefined && dados.nomeDono !== null) {
    if (typeof dados.nomeDono !== 'string') {
      throw new ErroValidacao("O campo 'nomeDono' deve ser uma string");
    }
    if (dados.nomeDono.length > 100) {
      throw new ErroValidacao("O campo 'nomeDono' deve ter no máximo 100 caracteres");
    }
  }
}

/**
 * Valida os dados para atualização de um pet
 * Permite atualização parcial, mas valida os campos fornecidos
 * 
 * @param dados - Dados do pet a serem validados
 * @throws ErroValidacao se dados inválidos
 */
export function validarAtualizacaoPet(dados: any): asserts dados is AtualizarPetDTO {
  // Verifica se pelo menos um campo foi fornecido
  const camposPresentes = ['nome', 'tipo', 'idade', 'raca', 'nomeDono']
    .filter(campo => dados[campo] !== undefined);

  if (camposPresentes.length === 0) {
    throw new ErroValidacao("É necessário fornecer pelo menos um campo para atualização");
  }

  // Valida 'nome' se fornecido
  if (dados.nome !== undefined) {
    if (typeof dados.nome !== 'string') {
      throw new ErroValidacao("O campo 'nome' deve ser uma string");
    }
    if (dados.nome.trim().length === 0) {
      throw new ErroValidacao("O campo 'nome' não pode ser vazio");
    }
    if (dados.nome.length > 100) {
      throw new ErroValidacao("O campo 'nome' deve ter no máximo 100 caracteres");
    }
  }

  // Valida 'tipo' se fornecido
  if (dados.tipo !== undefined) {
    const tiposValidos = Object.values(TipoPet);
    if (!tiposValidos.includes(dados.tipo)) {
      throw new ErroValidacao(
        `O campo 'tipo' deve ser um dos seguintes valores: ${tiposValidos.join(', ')}`,
        { tiposValidos }
      );
    }
  }

  // Valida 'idade' se fornecido
  if (dados.idade !== undefined) {
    if (typeof dados.idade !== 'number') {
      throw new ErroValidacao("O campo 'idade' deve ser um número");
    }
    if (dados.idade < 0) {
      throw new ErroValidacao("O campo 'idade' não pode ser negativo");
    }
    if (dados.idade > 150) {
      throw new ErroValidacao("O campo 'idade' deve ser um valor realista (máximo 150 anos)");
    }
    if (!Number.isInteger(dados.idade)) {
      throw new ErroValidacao("O campo 'idade' deve ser um número inteiro");
    }
  }

  // Valida 'raca' se fornecido
  if (dados.raca !== undefined && dados.raca !== null) {
    if (typeof dados.raca !== 'string') {
      throw new ErroValidacao("O campo 'raca' deve ser uma string");
    }
    if (dados.raca.length > 100) {
      throw new ErroValidacao("O campo 'raca' deve ter no máximo 100 caracteres");
    }
  }

  // Valida 'nomeDono' se fornecido
  if (dados.nomeDono !== undefined && dados.nomeDono !== null) {
    if (typeof dados.nomeDono !== 'string') {
      throw new ErroValidacao("O campo 'nomeDono' deve ser uma string");
    }
    if (dados.nomeDono.length > 100) {
      throw new ErroValidacao("O campo 'nomeDono' deve ter no máximo 100 caracteres");
    }
  }
}

/**
 * Valida os filtros de busca
 * @param filtros - Filtros a serem validados
 * @throws ErroValidacao se filtros inválidos
 */
export function validarFiltros(filtros: any): void {
  if (filtros.tipo !== undefined) {
    const tiposValidos = Object.values(TipoPet);
    if (!tiposValidos.includes(filtros.tipo)) {
      throw new ErroValidacao(
        `O filtro 'tipo' deve ser um dos seguintes valores: ${tiposValidos.join(', ')}`,
        { tiposValidos }
      );
    }
  }

  if (filtros.idade !== undefined) {
    const idade = Number(filtros.idade);
    if (isNaN(idade)) {
      throw new ErroValidacao("O filtro 'idade' deve ser um número válido");
    }
    if (idade < 0) {
      throw new ErroValidacao("O filtro 'idade' não pode ser negativo");
    }
  }
}
