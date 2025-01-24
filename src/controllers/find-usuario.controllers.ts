import { Request, Response } from 'express';
import { FindUsuarioService } from '../services/find-usuario.services';

export class FindUsuarioController {
  constructor(private findUsuarioService: FindUsuarioService) {}

  public execute(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const resultado = this.findUsuarioService.execute(id);

      if (resultado.errors.length > 0) {
        res.status(422).json({ errors: resultado.errors });
        return;
      }

      res.status(200).json(resultado.data);
    } catch (err: unknown) {
      const error = err as Error;

      console.error(error);
      res.status(500).json({ message: 'Erro no servidor' });
    }
  }
}
