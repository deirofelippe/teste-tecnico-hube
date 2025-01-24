import { UsuarioRepository } from '../repositories/usuario';
import { Result, Usuario } from '../types';
import { sanitize } from '../utils/sanitize';
import { CreateUsuarioValidator } from '../validators/create-usuario';

export class CreateUsuarioService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private createUsuarioValidator: CreateUsuarioValidator
  ) {}

  public execute(usuario: Usuario): Result {
    const result: Result = {
      errors: [],
      data: {}
    };

    const validatorErrors = this.createUsuarioValidator.validate(usuario);

    if (validatorErrors.errors.length > 0) {
      result.errors.push(...validatorErrors.errors);
      return result;
    }

    usuario = sanitize(usuario);

    const usuarioCriado = this.usuarioRepository.create(usuario);

    result.data = {
      usuarioCriado
    };

    return result;
  }
}
