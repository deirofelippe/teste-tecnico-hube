import { NextFunction, Request, Response } from 'express';

export function errorHandling(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  console.error(err.message);
  console.error('error handling');

  res.status(500).json({ message: 'Erro no servidor' });
}
