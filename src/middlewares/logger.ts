import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de logging simples
 * Registra informações básicas sobre cada requisição
 * 
 * Informações logadas:
 * - Timestamp
 * - Método HTTP
 * - URL
 * - Status da resposta
 * - Tempo de processamento
 * 
 * Útil para:
 * - Debugging
 * - Monitoramento
 * - Auditoria de requisições
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const inicio = Date.now();
  const timestamp = new Date().toISOString();

  // Log da requisição recebida
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Captura o evento de finalização da resposta
  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    console.log(
      `[${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode} - Duração: ${duracao}ms`
    );
  });

  next();
}
