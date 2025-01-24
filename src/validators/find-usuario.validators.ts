import { ValidatorErrors } from '../types';

export class FindUsuarioValidator {
  public validate(id: string): ValidatorErrors {
    const errors: ValidatorErrors['errors'] = [];

    id = id.trim();

    const idNaoEstaCerto = !(id.length > 0);
    if (idNaoEstaCerto) {
      errors.push({
        message: 'Id deve ser informado.'
      });
    }

    return { errors };
  }
}
