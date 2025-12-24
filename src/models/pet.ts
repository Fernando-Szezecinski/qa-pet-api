/**
 * Enum para os tipos de pets permitidos no sistema
 * Facilita a validação e padronização dos tipos
 */
export enum TipoPet {
  CACHORRO = 'cachorro',
  GATO = 'gato',
  AVE = 'ave',
  OUTRO = 'outro'
}

/**
 * Interface principal que define a estrutura de um Pet
 * Todos os campos são tipados para garantir consistência
 */
export interface Pet {
  /** Identificador único do pet (UUID v4) */
  id: string;
  
  /** Nome do pet (obrigatório) */
  nome: string;
  
  /** Tipo/espécie do pet */
  tipo: TipoPet;
  
  /** Idade do pet em anos (deve ser >= 0) */
  idade: number;
  
  /** Raça do pet (opcional) */
  raca?: string;
  
  /** Nome do dono do pet (opcional) */
  nomeDono?: string;
  
  /** Data de criação do registro (ISO 8601) */
  criadoEm: string;
  
  /** Data da última atualização (ISO 8601) */
  atualizadoEm: string;
}

/**
 * Interface para criação de um novo pet
 * Não inclui campos gerados automaticamente (id, datas)
 */
export interface CriarPetDTO {
  nome: string;
  tipo: TipoPet;
  idade: number;
  raca?: string;
  nomeDono?: string;
}

/**
 * Interface para atualização de um pet
 * Todos os campos são opcionais (permite atualização parcial)
 */
export interface AtualizarPetDTO {
  nome?: string;
  tipo?: TipoPet;
  idade?: number;
  raca?: string;
  nomeDono?: string;
}

/**
 * Interface para filtros de busca
 * Permite filtrar pets por tipo e/ou idade
 */
export interface FiltrosPet {
  tipo?: TipoPet;
  idade?: number;
}

/**
 * Estrutura padronizada para respostas de erro
 * Facilita testes automatizados e validação de contratos
 */
export interface ErroResposta {
  /** Código identificador do tipo de erro */
  erro: string;
  
  /** Mensagem descritiva em português */
  mensagem: string;
  
  /** Detalhes adicionais sobre o erro (opcional) */
  detalhes?: any;
}
