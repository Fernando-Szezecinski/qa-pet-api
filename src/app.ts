import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import { petRouter } from './controllers/petController';
import { loggerMiddleware } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerDefinition } from './swagger/swagger';

/**
 * Cria e configura a aplicação Express
 * Esta função é reutilizada tanto para desenvolvimento local quanto para Vercel
 * 
 * @returns Aplicação Express configurada
 */
export function createApp(): Express {
  const app = express();

  // Middlewares globais
  app.use(cors()); // Permite requisições de qualquer origem
  app.use(express.json()); // Parse de JSON no body das requisições
  app.use(loggerMiddleware); // Log de todas as requisições

  // Rota raiz - informações sobre a API
  app.get('/', (req, res) => {
    res.json({
      mensagem: 'Bem-vindo à QA Pet API! 🐾',
      versao: '1.0.0',
      descricao: 'API REST para treinamento e prática de testes de QA',
      documentacao: '/api-docs',
      rotas: {
        pets: '/pets',
        documentacao: '/api-docs'
      },
      links: {
        github: 'https://github.com/seu-usuario/qa-pet-api',
        documentacao: 'https://qa-pet-api.vercel.app/api-docs'
      }
    });
  });

  // Rota de health check
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Favicon (evita erro 404 no console)
  app.get('/favicon.ico', (req, res) => {
    const faviconPath = path.join(__dirname, '../public/favicon.svg');
    if (fs.existsSync(faviconPath)) {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.sendFile(faviconPath);
    } else {
      res.status(204).end();
    }
  });

  // Documentação Swagger
  app.get('/api-docs', (req, res) => {
    // Detecta a URL base dinamicamente
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;
    
    // Adiciona o servidor atual dinamicamente
    const swaggerWithServer = {
      ...swaggerDefinition,
      servers: [
        { url: baseUrl, description: 'Servidor atual' },
        ...swaggerDefinition.servers
      ]
    };
    
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>QA Pet API - Documentação</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.ico">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    .swagger-ui .topbar { display: none }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      window.ui = SwaggerUIBundle({
        spec: ${JSON.stringify(swaggerWithServer)},
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'list',
        defaultModelsExpandDepth: 1,
        defaultModelExpandDepth: 1
      });
    };
  </script>
</body>
</html>`;
    res.send(html);
  });

  // Rotas da API
  app.use('/pets', petRouter);

  // Middleware de tratamento de erros (deve ser o último)
  app.use(errorHandler);

  return app;
}
