import { Request, Response, NextFunction } from 'express';
import { ErroValidacao } from '../utils/validators';
import { ErroRecursoNaoEncontrado } from '../services/petService';
import { ErroResposta } from '../models/pet';

/**
 * Middleware global de tratamento de erros
 * Captura todos os erros da aplicação e retorna respostas padronizadas
 * 
 * Tipos de erros tratados:
 * - ErroValidacao: retorna 400 (Bad Request)
 * - ErroRecursoNaoEncontrado: retorna 404 (Not Found)
 * - Erros genéricos: retorna 500 (Internal Server Error)
 * 
 * Todas as respostas seguem o padrão ErroResposta para facilitar testes
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Loga o erro completo para debug
  console.error('Erro capturado:', {
    nome: err.name,
    mensagem: err.message,
    stack: err.stack,
    url: req.url,
    metodo: req.method
  });

  // Trata erro de validação (400)
  if (err instanceof ErroValidacao) {
    const resposta: ErroResposta = {
      erro: 'ERRO_VALIDACAO',
      mensagem: err.message,
      detalhes: err.detalhes
    };
    res.status(400).json(resposta);
    return;
  }

  // Trata erro de recurso não encontrado (404)
  if (err instanceof ErroRecursoNaoEncontrado) {
    const resposta: ErroResposta = {
      erro: 'RECURSO_NAO_ENCONTRADO',
      mensagem: err.message
    };
    res.status(404).json(resposta);
    return;
  }

  // Trata erro de sintaxe JSON (400)
  if (err instanceof SyntaxError && 'body' in err) {
    const resposta: ErroResposta = {
      erro: 'JSON_INVALIDO',
      mensagem: 'O corpo da requisição contém JSON inválido'
    };
    res.status(400).json(resposta);
    return;
  }

  // Erro genérico (500)
  const resposta: ErroResposta = {
    erro: 'ERRO_INTERNO',
    mensagem: 'Ocorreu um erro interno no servidor'
  };
  res.status(500).json(resposta);
}
