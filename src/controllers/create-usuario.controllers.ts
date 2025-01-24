import { Request, Response } from 'express';
import { CreateUsuarioService } from '../services/create-usuario.services';
import { Usuario } from '../types';

export class CreateUsuarioController {
  constructor(private createUsuarioService: CreateUsuarioService) {}

  public execute(req: Request, res: Response) {
    try {
      const body = req.body;

      const usuario: Usuario = {
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        dataNascimento: body.dataNascimento
      };

      const resultado = this.createUsuarioService.execute(usuario);

      if (resultado.errors.length > 0) {
        res.status(422).json({ errors: resultado.errors });
      }

      res.status(201).json(resultado.data);
    } catch (err: unknown) {
      const error = err as Error;

      console.error(error.stack);
      console.error(error.message);

      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}
