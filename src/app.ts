import express, { Express } from 'express';
import cors from 'cors';
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

  // Documentação Swagger
  const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'QA Pet API - Documentação',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1
    },
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js'
    ],
    customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css'
  };
  
  app.get('/api-docs', (req, res) => {
    res.send(swaggerUi.generateHTML(swaggerDefinition, swaggerOptions));
  });

  // Rotas da API
  app.use('/pets', petRouter);

  // Middleware de tratamento de erros (deve ser o último)
  app.use(errorHandler);

  return app;
}
