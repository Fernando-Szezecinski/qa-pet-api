/**
 * Configuração da documentação Swagger (OpenAPI 3.0)
 * 
 * Esta documentação está totalmente em português para facilitar
 * o aprendizado e prática de QA
 */
export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'QA Pet API',
    version: '1.0.0',
    description: 'API REST para treinamento e prática de testes de QA (manual e automação).'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento local'
    },
    {
      url: 'https://qa-pet-api.vercel.app',
      description: 'Servidor de produção (Vercel)'
    }
  ],
  tags: [
    {
      name: 'Pets',
      description: 'Operações relacionadas a pets (animais de estimação)'
    }
  ],
  components: {
    schemas: {
      TipoPet: {
        type: 'string',
        enum: ['cachorro', 'gato', 'ave', 'outro'],
        description: 'Tipo/espécie do pet',
        example: 'cachorro'
      },
      Pet: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Identificador único do pet (gerado automaticamente)',
            example: '550e8400-e29b-41d4-a716-446655440000'
          },
          nome: {
            type: 'string',
            description: 'Nome do pet',
            minLength: 1,
            maxLength: 100,
            example: 'Rex'
          },
          tipo: {
            $ref: '#/components/schemas/TipoPet'
          },
          idade: {
            type: 'integer',
            minimum: 0,
            maximum: 150,
            description: 'Idade do pet em anos',
            example: 5
          },
          raca: {
            type: 'string',
            description: 'Raça do pet (opcional)',
            maxLength: 100,
            example: 'Labrador',
            nullable: true
          },
          nomeDono: {
            type: 'string',
            description: 'Nome do dono do pet (opcional)',
            maxLength: 100,
            example: 'João Silva',
            nullable: true
          },
          criadoEm: {
            type: 'string',
            format: 'date-time',
            description: 'Data e hora de criação do registro (ISO 8601)',
            example: '2024-01-15T10:30:00.000Z'
          },
          atualizadoEm: {
            type: 'string',
            format: 'date-time',
            description: 'Data e hora da última atualização (ISO 8601)',
            example: '2024-01-15T10:30:00.000Z'
          }
        },
        required: ['id', 'nome', 'tipo', 'idade', 'criadoEm', 'atualizadoEm']
      },
      CriarPetDTO: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome do pet (obrigatório)',
            minLength: 1,
            maxLength: 100,
            example: 'Rex'
          },
          tipo: {
            $ref: '#/components/schemas/TipoPet'
          },
          idade: {
            type: 'integer',
            minimum: 0,
            maximum: 150,
            description: 'Idade do pet em anos (obrigatório)',
            example: 5
          },
          raca: {
            type: 'string',
            description: 'Raça do pet (opcional)',
            maxLength: 100,
            example: 'Labrador'
          },
          nomeDono: {
            type: 'string',
            description: 'Nome do dono do pet (opcional)',
            maxLength: 100,
            example: 'João Silva'
          }
        },
        required: ['nome', 'tipo', 'idade']
      },
      AtualizarPetDTO: {
        type: 'object',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome do pet',
            minLength: 1,
            maxLength: 100,
            example: 'Rex Atualizado'
          },
          tipo: {
            $ref: '#/components/schemas/TipoPet'
          },
          idade: {
            type: 'integer',
            minimum: 0,
            maximum: 150,
            description: 'Idade do pet em anos',
            example: 6
          },
          raca: {
            type: 'string',
            description: 'Raça do pet',
            maxLength: 100,
            example: 'Golden Retriever'
          },
          nomeDono: {
            type: 'string',
            description: 'Nome do dono do pet',
            maxLength: 100,
            example: 'Maria Santos'
          }
        },
        description: 'Todos os campos são opcionais. Permite atualização parcial.'
      },
      ErroResposta: {
        type: 'object',
        properties: {
          erro: {
            type: 'string',
            description: 'Código identificador do tipo de erro',
            example: 'ERRO_VALIDACAO'
          },
          mensagem: {
            type: 'string',
            description: 'Mensagem descritiva do erro em português',
            example: "O campo 'nome' é obrigatório"
          },
          detalhes: {
            type: 'object',
            description: 'Informações adicionais sobre o erro (opcional)',
            additionalProperties: true
          }
        },
        required: ['erro', 'mensagem']
      }
    },
    responses: {
      BadRequest: {
        description: 'Requisição inválida - erro de validação',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErroResposta'
            },
            examples: {
              campoObrigatorio: {
                summary: 'Campo obrigatório ausente',
                value: {
                  erro: 'ERRO_VALIDACAO',
                  mensagem: "O campo 'nome' é obrigatório"
                }
              },
              idadeNegativa: {
                summary: 'Idade negativa',
                value: {
                  erro: 'ERRO_VALIDACAO',
                  mensagem: "O campo 'idade' não pode ser negativo"
                }
              },
              tipoInvalido: {
                summary: 'Tipo inválido',
                value: {
                  erro: 'ERRO_VALIDACAO',
                  mensagem: "O campo 'tipo' deve ser um dos seguintes valores: cachorro, gato, ave, outro",
                  detalhes: {
                    tiposValidos: ['cachorro', 'gato', 'ave', 'outro']
                  }
                }
              },
              uuidInvalido: {
                summary: 'UUID inválido',
                value: {
                  erro: 'ID_INVALIDO',
                  mensagem: 'O ID fornecido não é um UUID válido'
                }
              }
            }
          }
        }
      },
      NotFound: {
        description: 'Recurso não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErroResposta'
            },
            example: {
              erro: 'RECURSO_NAO_ENCONTRADO',
              mensagem: "Pet com ID '550e8400-e29b-41d4-a716-446655440000' não foi encontrado"
            }
          }
        }
      }
    }
  },
  paths: {
    '/pets': {
      post: {
        tags: ['Pets'],
        summary: 'Criar um novo pet',
        description: `
Cria um novo pet no sistema.

**Regras de validação:**
- \`nome\`: obrigatório, não pode ser vazio, máximo 100 caracteres
- \`tipo\`: obrigatório, deve ser um dos valores: cachorro, gato, ave, outro
- \`idade\`: obrigatório, deve ser >= 0 e <= 150
- \`raca\`: opcional, máximo 100 caracteres
- \`nomeDono\`: opcional, máximo 100 caracteres

**Cenários de teste sugeridos:**
- ✅ Criar pet com dados válidos
- ✅ Criar pet sem campos opcionais
- ❌ Criar pet sem nome
- ❌ Criar pet com idade negativa
- ❌ Criar pet com tipo inválido
        `,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CriarPetDTO'
              },
              examples: {
                completo: {
                  summary: 'Pet com todos os campos',
                  value: {
                    nome: 'Rex',
                    tipo: 'cachorro',
                    idade: 5,
                    raca: 'Labrador',
                    nomeDono: 'João Silva'
                  }
                },
                minimo: {
                  summary: 'Pet com campos mínimos',
                  value: {
                    nome: 'Mimi',
                    tipo: 'gato',
                    idade: 3
                  }
                },
                invalido: {
                  summary: 'Exemplo inválido (idade negativa)',
                  value: {
                    nome: 'Bob',
                    tipo: 'cachorro',
                    idade: -1
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Pet criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                },
                example: {
                  id: '550e8400-e29b-41d4-a716-446655440000',
                  nome: 'Rex',
                  tipo: 'cachorro',
                  idade: 5,
                  raca: 'Labrador',
                  nomeDono: 'João Silva',
                  criadoEm: '2024-01-15T10:30:00.000Z',
                  atualizadoEm: '2024-01-15T10:30:00.000Z'
                }
              }
            }
          },
          '400': {
            $ref: '#/components/responses/BadRequest'
          }
        }
      },
      get: {
        tags: ['Pets'],
        summary: 'Listar todos os pets',
        description: `
Lista todos os pets cadastrados no sistema, com possibilidade de filtros.

**Filtros disponíveis:**
- \`tipo\`: filtra por tipo de pet (cachorro, gato, ave, outro)
- \`idade\`: filtra por idade exata

**Cenários de teste sugeridos:**
- ✅ Listar todos os pets
- ✅ Filtrar pets por tipo
- ✅ Filtrar pets por idade
- ✅ Combinar filtros (tipo e idade)
- ❌ Usar filtro com tipo inválido
        `,
        parameters: [
          {
            name: 'tipo',
            in: 'query',
            description: 'Filtrar por tipo de pet',
            required: false,
            schema: {
              $ref: '#/components/schemas/TipoPet'
            }
          },
          {
            name: 'idade',
            in: 'query',
            description: 'Filtrar por idade',
            required: false,
            schema: {
              type: 'integer',
              minimum: 0
            }
          }
        ],
        responses: {
          '200': {
            description: 'Lista de pets retornada com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Pet'
                  }
                },
                examples: {
                  multiplos: {
                    summary: 'Múltiplos pets',
                    value: [
                      {
                        id: '550e8400-e29b-41d4-a716-446655440001',
                        nome: 'Rex',
                        tipo: 'cachorro',
                        idade: 5,
                        raca: 'Labrador',
                        nomeDono: 'João Silva',
                        criadoEm: '2024-01-15T10:30:00.000Z',
                        atualizadoEm: '2024-01-15T10:30:00.000Z'
                      },
                      {
                        id: '550e8400-e29b-41d4-a716-446655440002',
                        nome: 'Mimi',
                        tipo: 'gato',
                        idade: 3,
                        raca: 'Persa',
                        nomeDono: 'Maria Santos',
                        criadoEm: '2024-01-15T11:00:00.000Z',
                        atualizadoEm: '2024-01-15T11:00:00.000Z'
                      }
                    ]
                  },
                  vazio: {
                    summary: 'Nenhum pet encontrado',
                    value: []
                  }
                }
              }
            }
          },
          '400': {
            $ref: '#/components/responses/BadRequest'
          }
        }
      }
    },
    '/pets/{id}': {
      get: {
        tags: ['Pets'],
        summary: 'Buscar pet por ID',
        description: `
Busca um pet específico pelo seu ID (UUID).

**Cenários de teste sugeridos:**
- ✅ Buscar pet existente
- ❌ Buscar pet com ID inexistente
- ❌ Buscar pet com ID inválido (não UUID)
        `,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'UUID do pet',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            example: '550e8400-e29b-41d4-a716-446655440000'
          }
        ],
        responses: {
          '200': {
            description: 'Pet encontrado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                },
                example: {
                  id: '550e8400-e29b-41d4-a716-446655440000',
                  nome: 'Rex',
                  tipo: 'cachorro',
                  idade: 5,
                  raca: 'Labrador',
                  nomeDono: 'João Silva',
                  criadoEm: '2024-01-15T10:30:00.000Z',
                  atualizadoEm: '2024-01-15T10:30:00.000Z'
                }
              }
            }
          },
          '400': {
            $ref: '#/components/responses/BadRequest'
          },
          '404': {
            $ref: '#/components/responses/NotFound'
          }
        }
      },
      put: {
        tags: ['Pets'],
        summary: 'Atualizar um pet',
        description: `
Atualiza um pet existente. Permite atualização parcial (apenas os campos fornecidos serão atualizados).

**Regras:**
- Todos os campos são opcionais
- Pelo menos um campo deve ser fornecido
- As mesmas validações da criação se aplicam aos campos fornecidos
- O campo \`atualizadoEm\` é atualizado automaticamente

**Cenários de teste sugeridos:**
- ✅ Atualizar um campo
- ✅ Atualizar múltiplos campos
- ✅ Atualizar todos os campos
- ❌ Atualizar sem fornecer nenhum campo
- ❌ Atualizar com ID inexistente
- ❌ Atualizar com dados inválidos
        `,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'UUID do pet',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            example: '550e8400-e29b-41d4-a716-446655440000'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AtualizarPetDTO'
              },
              examples: {
                atualizarNome: {
                  summary: 'Atualizar apenas o nome',
                  value: {
                    nome: 'Rex Atualizado'
                  }
                },
                atualizarMultiplos: {
                  summary: 'Atualizar múltiplos campos',
                  value: {
                    idade: 6,
                    raca: 'Golden Retriever',
                    nomeDono: 'Maria Santos'
                  }
                },
                atualizarTodos: {
                  summary: 'Atualizar todos os campos',
                  value: {
                    nome: 'Max',
                    tipo: 'cachorro',
                    idade: 7,
                    raca: 'Bulldog',
                    nomeDono: 'Pedro Oliveira'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Pet atualizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Pet'
                },
                example: {
                  id: '550e8400-e29b-41d4-a716-446655440000',
                  nome: 'Rex Atualizado',
                  tipo: 'cachorro',
                  idade: 6,
                  raca: 'Golden Retriever',
                  nomeDono: 'Maria Santos',
                  criadoEm: '2024-01-15T10:30:00.000Z',
                  atualizadoEm: '2024-01-15T14:45:00.000Z'
                }
              }
            }
          },
          '400': {
            $ref: '#/components/responses/BadRequest'
          },
          '404': {
            $ref: '#/components/responses/NotFound'
          }
        }
      },
      delete: {
        tags: ['Pets'],
        summary: 'Remover um pet',
        description: `
Remove um pet do sistema.

**Importante:** Retorna 204 (No Content) sem corpo na resposta quando bem-sucedido.

**Cenários de teste sugeridos:**
- ✅ Remover pet existente
- ❌ Remover pet com ID inexistente
- ❌ Remover pet com ID inválido
- ✅ Verificar que o pet foi realmente removido (buscar após remoção)
        `,
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'UUID do pet',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid'
            },
            example: '550e8400-e29b-41d4-a716-446655440000'
          }
        ],
        responses: {
          '204': {
            description: 'Pet removido com sucesso (sem conteúdo na resposta)'
          },
          '400': {
            $ref: '#/components/responses/BadRequest'
          },
          '404': {
            $ref: '#/components/responses/NotFound'
          }
        }
      }
    }
  }
};
