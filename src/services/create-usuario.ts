import { UsuarioRepository } from '@src/repositories/usuario';
import { Result, Usuario } from '@src/types';
import { CreateUsuarioValidator } from '@src/validators/create-usuario';

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

    const telefone = usuario.telefone.replace(/[^0-9]/g, '');
    usuario.telefone = telefone;

    this.usuarioRepository.create(usuario);

    return result;
  }
}
