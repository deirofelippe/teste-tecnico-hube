import { UsuarioRepository } from '@src/repositories/usuario';
import { Result, Usuario } from '@src/types';
import { FindUsuarioValidator } from '@src/validators/find-usuario';

export class FindUsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private findUsuarioValidator: FindUsuarioValidator
  ) {}

  public execute(id: string): Result {
    const result: Result = {
      errors: [],
      data: {}
    };

    const validatorErrors = this.findUsuarioValidator.validate(id);

    if (validatorErrors.errors.length > 0) {
      result.errors.push(...validatorErrors.errors);
      return result;
    }

    id = id.trim();

    const usuarioBuscado = this.usuarioRepository.findOne(id);

    if (!usuarioBuscado) {
      result.errors.push({ message: 'Usuário inexistente.' });
      return result;
    }

    result.data = { usuario: usuarioBuscado };

    return result;
  }
}
