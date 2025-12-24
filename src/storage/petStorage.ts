import { Pet, FiltrosPet } from '../models/pet';

/**
 * Classe responsável pelo armazenamento em memória dos pets
 * Simula um banco de dados mantendo os dados durante a execução
 * 
 * IMPORTANTE: Em ambiente serverless (Vercel), cada função é stateless,
 * então os dados são reiniciados a cada cold start. Para produção,
 * considere usar um banco de dados real ou serviço de cache.
 */
class PetStorage {
  private pets: Map<string, Pet>;

  constructor() {
    this.pets = new Map();
    // Inicializa com alguns pets de exemplo para facilitar testes
    this.inicializarDadosExemplo();
  }

  /**
   * Adiciona pets de exemplo ao inicializar o storage
   * Útil para testes e demonstrações
   */
  private inicializarDadosExemplo(): void {
    const petsExemplo: Pet[] = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        nome: 'Rex',
        tipo: 'cachorro' as any,
        idade: 5,
        raca: 'Labrador',
        nomeDono: 'João Silva',
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        nome: 'Mimi',
        tipo: 'gato' as any,
        idade: 3,
        raca: 'Persa',
        nomeDono: 'Maria Santos',
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString()
      }
    ];

    petsExemplo.forEach(pet => this.pets.set(pet.id, pet));
  }

  /**
   * Salva um novo pet no storage
   * @param pet - Pet a ser salvo
   */
  salvar(pet: Pet): void {
    this.pets.set(pet.id, pet);
  }

  /**
   * Busca um pet pelo ID
   * @param id - ID do pet
   * @returns Pet encontrado ou undefined
   */
  buscarPorId(id: string): Pet | undefined {
    return this.pets.get(id);
  }

  /**
   * Lista todos os pets com filtros opcionais
   * @param filtros - Filtros a serem aplicados (tipo e/ou idade)
   * @returns Array de pets que atendem aos filtros
   */
  listarTodos(filtros?: FiltrosPet): Pet[] {
    let pets = Array.from(this.pets.values());

    // Aplica filtro por tipo se fornecido
    if (filtros?.tipo) {
      pets = pets.filter(pet => pet.tipo === filtros.tipo);
    }

    // Aplica filtro por idade se fornecido
    if (filtros?.idade !== undefined) {
      pets = pets.filter(pet => pet.idade === filtros.idade);
    }

    return pets;
  }

  /**
   * Atualiza um pet existente
   * @param id - ID do pet
   * @param petAtualizado - Dados atualizados do pet
   * @returns true se atualizado com sucesso, false se não encontrado
   */
  atualizar(id: string, petAtualizado: Pet): boolean {
    if (!this.pets.has(id)) {
      return false;
    }
    this.pets.set(id, petAtualizado);
    return true;
  }

  /**
   * Remove um pet pelo ID
   * @param id - ID do pet a ser removido
   * @returns true se removido com sucesso, false se não encontrado
   */
  deletar(id: string): boolean {
    return this.pets.delete(id);
  }

  /**
   * Verifica se um pet existe
   * @param id - ID do pet
   * @returns true se existe, false caso contrário
   */
  existe(id: string): boolean {
    return this.pets.has(id);
  }

  /**
   * Retorna a quantidade total de pets armazenados
   * @returns Número de pets
   */
  contar(): number {
    return this.pets.size;
  }

  /**
   * Limpa todos os pets do storage
   * Útil para testes
   */
  limpar(): void {
    this.pets.clear();
  }
}

// Exporta uma instância única (Singleton)
// Em serverless, cada invocação pode ter sua própria instância
export const petStorage = new PetStorage();
