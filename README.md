# 🐾 QA Pet API

API REST voltada para **treinamento e prática de testes de QA** (manual e automação), utilizando o domínio de animais de estimação (pets).

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/qa-pet-api)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Documentação da API](#documentação-da-api)
- [Exemplos de Requisições](#exemplos-de-requisições)
- [Cenários de Teste](#cenários-de-teste)
- [Deploy no Vercel](#deploy-no-vercel)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

Esta API foi desenvolvida especialmente para **profissionais e estudantes de QA** praticarem:

- ✅ **Testes manuais** com cenários positivos e negativos
- 🤖 **Automação de testes** com respostas previsíveis
- 📋 **Testes de contrato** com estruturas bem definidas
- 🔍 **Testes de API REST** com todos os métodos HTTP
- 📊 **Validação de códigos de status** HTTP corretos

A API gerencia um CRUD completo de **Pets (Animais de Estimação)** com validações robustas e mensagens de erro claras em português.

## 🚀 Tecnologias

- **TypeScript** - Linguagem principal
- **Node.js** - Runtime
- **Express** - Framework web
- **Swagger/OpenAPI 3.0** - Documentação interativa
- **Vercel** - Deploy serverless
- **UUID** - Geração de identificadores únicos

## ✨ Características

### Funcionalidades

- ✅ CRUD completo de Pets
- 🔍 Filtros de busca (por tipo e idade)
- 🎯 Validações abrangentes
- 📝 Documentação Swagger interativa em português
- 🌐 CORS habilitado
- 📊 Logs de requisições
- ⚠️ Tratamento global de erros
- 🔄 Suporte a atualização parcial

### Códigos HTTP

A API utiliza os códigos HTTP corretos:

- `200` - Sucesso (GET, PUT)
- `201` - Criado (POST)
- `204` - Sem conteúdo (DELETE)
- `400` - Erro de validação
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor

### Estrutura do Pet

```typescript
{
  id: string;          // UUID gerado automaticamente
  nome: string;        // Obrigatório
  tipo: string;        // cachorro | gato | ave | outro
  idade: number;       // >= 0
  raca?: string;       // Opcional
  nomeDono?: string;   // Opcional
  criadoEm: string;    // Data ISO 8601
  atualizadoEm: string; // Data ISO 8601
}
```

## 📁 Estrutura do Projeto

```
qa-pet-api/
├── api/
│   └── index.ts                 # Entry point para Vercel Serverless
├── src/
│   ├── controllers/
│   │   └── petController.ts     # Rotas e handlers HTTP
│   ├── middlewares/
│   │   ├── errorHandler.ts      # Tratamento global de erros
│   │   └── logger.ts            # Logging de requisições
│   ├── models/
│   │   └── pet.ts               # Interfaces e tipos
│   ├── services/
│   │   └── petService.ts        # Lógica de negócio
│   ├── storage/
│   │   └── petStorage.ts        # Persistência em memória
│   ├── swagger/
│   │   └── swagger.ts           # Configuração Swagger/OpenAPI
│   ├── utils/
│   │   └── validators.ts        # Funções de validação
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Servidor local
├── package.json
├── tsconfig.json
├── vercel.json                  # Configuração Vercel
└── README.md
```

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/qa-pet-api.git
cd qa-pet-api
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute em modo de desenvolvimento**

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## 🎮 Uso

### Executar localmente

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

### Acessar a documentação

Após iniciar o servidor, acesse:

- **API Base**: http://localhost:3000
- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health

## 📚 Documentação da API

A documentação completa está disponível via Swagger UI em `/api-docs`.

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/pets` | Criar um novo pet |
| `GET` | `/pets` | Listar todos os pets |
| `GET` | `/pets?tipo=cachorro` | Filtrar pets por tipo |
| `GET` | `/pets?idade=5` | Filtrar pets por idade |
| `GET` | `/pets/:id` | Buscar pet por ID |
| `PUT` | `/pets/:id` | Atualizar pet |
| `DELETE` | `/pets/:id` | Remover pet |

## 🧪 Exemplos de Requisições

### Criar um Pet

```bash
curl -X POST http://localhost:3000/pets \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Rex",
    "tipo": "cachorro",
    "idade": 5,
    "raca": "Labrador",
    "nomeDono": "João Silva"
  }'
```

**Resposta (201 Created):**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Rex",
  "tipo": "cachorro",
  "idade": 5,
  "raca": "Labrador",
  "nomeDono": "João Silva",
  "criadoEm": "2024-01-15T10:30:00.000Z",
  "atualizadoEm": "2024-01-15T10:30:00.000Z"
}
```

### Listar Todos os Pets

```bash
curl http://localhost:3000/pets
```

### Filtrar Pets por Tipo

```bash
curl http://localhost:3000/pets?tipo=gato
```

### Buscar Pet por ID

```bash
curl http://localhost:3000/pets/550e8400-e29b-41d4-a716-446655440000
```

### Atualizar um Pet (Parcial)

```bash
curl -X PUT http://localhost:3000/pets/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "idade": 6,
    "nomeDono": "Maria Santos"
  }'
```

### Remover um Pet

```bash
curl -X DELETE http://localhost:3000/pets/550e8400-e29b-41d4-a716-446655440000
```

**Resposta:** `204 No Content`

## 🧪 Cenários de Teste

### Cenários Positivos ✅

- [x] Criar pet com todos os campos
- [x] Criar pet com campos mínimos (sem opcionais)
- [x] Listar todos os pets
- [x] Filtrar pets por tipo
- [x] Filtrar pets por idade
- [x] Buscar pet existente por ID
- [x] Atualizar um campo do pet
- [x] Atualizar múltiplos campos do pet
- [x] Remover pet existente

### Cenários Negativos ❌

#### Validação de Campos Obrigatórios

- [ ] Criar pet sem nome → `400 Bad Request`
- [ ] Criar pet sem tipo → `400 Bad Request`
- [ ] Criar pet sem idade → `400 Bad Request`

#### Validação de Tipos de Dados

- [ ] Criar pet com tipo inválido → `400 Bad Request`
- [ ] Criar pet com idade negativa → `400 Bad Request`
- [ ] Criar pet com idade não numérica → `400 Bad Request`
- [ ] Criar pet com nome vazio → `400 Bad Request`

#### Validação de Recursos

- [ ] Buscar pet com ID inexistente → `404 Not Found`
- [ ] Buscar pet com ID inválido (não UUID) → `400 Bad Request`
- [ ] Atualizar pet inexistente → `404 Not Found`
- [ ] Remover pet inexistente → `404 Not Found`

#### Validação de Atualização

- [ ] Atualizar pet sem fornecer campos → `400 Bad Request`
- [ ] Atualizar pet com dados inválidos → `400 Bad Request`

#### Validação de Filtros

- [ ] Filtrar com tipo inválido → `400 Bad Request`
- [ ] Filtrar com idade inválida → `400 Bad Request`

### Testes de Contrato 📋

Validar estrutura das respostas:

- [ ] Pet criado contém todos os campos esperados
- [ ] Campos opcionais retornam `null` quando não fornecidos
- [ ] Datas estão no formato ISO 8601
- [ ] ID é um UUID v4 válido
- [ ] Erros seguem o padrão `{ erro, mensagem, detalhes? }`

### Exemplo de Teste Automatizado (JavaScript)

```javascript
// Usando fetch ou axios
describe('QA Pet API - Testes', () => {
  
  it('Deve criar um pet com sucesso', async () => {
    const response = await fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Rex',
        tipo: 'cachorro',
        idade: 5
      })
    });
    
    expect(response.status).toBe(201);
    
    const pet = await response.json();
    expect(pet).toHaveProperty('id');
    expect(pet.nome).toBe('Rex');
    expect(pet.tipo).toBe('cachorro');
    expect(pet.idade).toBe(5);
  });
  
  it('Deve retornar erro ao criar pet sem nome', async () => {
    const response = await fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'cachorro',
        idade: 5
      })
    });
    
    expect(response.status).toBe(400);
    
    const erro = await response.json();
    expect(erro.erro).toBe('ERRO_VALIDACAO');
    expect(erro.mensagem).toContain('nome');
  });
  
});
```

## 🚀 Deploy no Vercel

### Opção 1: Pelo Botão

Clique no botão abaixo para fazer deploy direto:

[![Deploy com Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/qa-pet-api)

### Opção 2: Via CLI

1. **Instale a CLI do Vercel**

```bash
npm install -g vercel
```

2. **Faça login**

```bash
vercel login
```

3. **Execute o deploy**

```bash
vercel
```

4. **Deploy para produção**

```bash
vercel --prod
```

Após o deploy, a API estará disponível em uma URL como:
`https://qa-pet-api.vercel.app`

### Acessar documentação no Vercel

`https://qa-pet-api.vercel.app/api-docs`

## 📝 Notas Importantes

### Persistência de Dados

⚠️ **Importante**: Esta API usa armazenamento em memória. Os dados são perdidos quando o servidor é reiniciado ou em ambientes serverless (como Vercel) entre invocações.

Para uso em produção real, considere integrar:
- MongoDB
- PostgreSQL
- Redis
- Outro serviço de banco de dados

### Ambiente Serverless (Vercel)

Em ambientes serverless:
- Cada invocação pode ter sua própria instância
- Os dados em memória são efêmeros
- Cold starts podem ocorrer
- Ideal para testes e demonstrações

## 🧑‍💻 Testando com Postman/Insomnia

### Importar coleção

1. Acesse o Swagger UI em `/api-docs`
2. Clique em "Download" para baixar a especificação OpenAPI
3. Importe no Postman ou Insomnia

### Variáveis sugeridas

Crie uma variável de ambiente `baseUrl`:

- **Local**: `http://localhost:3000`
- **Produção**: `https://qa-pet-api.vercel.app`

## 🤝 Contribuindo

Contribuições são bem-vindas! Esta API foi criada para a comunidade de QA.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Para dúvidas ou sugestões sobre a API, abra uma issue no GitHub.

---

Desenvolvido com 💙 para a comunidade de QA

**Bons testes! 🚀**
