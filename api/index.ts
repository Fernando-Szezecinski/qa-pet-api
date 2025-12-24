import { createApp } from '../src/app';

/**
 * Entry point para Vercel Serverless Functions
 * 
 * A Vercel transforma este arquivo em uma função serverless
 * que responde a todas as requisições HTTP
 * 
 * Cada invocação desta função é stateless, então:
 * - O storage em memória é reiniciado a cada cold start
 * - Para produção real, considere usar um banco de dados
 */

const app = createApp();

// Exporta a aplicação para o Vercel
export default app;
