import { UsuarioRepository } from '../repositories/usuario.repositories';
import { Result } from '../types';
import { FindUsuarioValidator } from '../validators/find-usuario.validators';

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

    result.data = { usuario: { id, ...usuarioBuscado } };

    return result;
  }
}
