import { createApp } from './app';

/**
 * Arquivo para execução local da API
 * Use este arquivo ao rodar em desenvolvimento: npm run dev
 */

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║          🐾  QA Pet API - Servidor Iniciado  🐾       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

📍 Servidor rodando em: http://localhost:${PORT}
📚 Documentação Swagger: http://localhost:${PORT}/api-docs
🔍 Health Check: http://localhost:${PORT}/health

Rotas disponíveis:
  POST   /pets         - Criar pet
  GET    /pets         - Listar pets
  GET    /pets/:id     - Buscar pet
  PUT    /pets/:id     - Atualizar pet
  DELETE /pets/:id     - Remover pet

Pronto para testes! 🚀
  `);
});
