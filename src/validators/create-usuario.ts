import { Usuario, ValidatorErrors } from '@src/types';

export class CreateUsuarioValidator {
  public validate(usuario: Usuario): ValidatorErrors {
    const errors: ValidatorErrors['errors'] = [];

    const telefone = usuario.telefone.replace(/[^0-9]/g, '');

    const tamanhosPermitidos = [11, 10, 9, 8];

    const telefoneNaoEstaCerto = !tamanhosPermitidos.includes(telefone.length);
    if (telefoneNaoEstaCerto) {
      errors.push({ message: 'Telefone deve conter 8, 9, 10 ou 11 números.' });
    }

    const padraoDeData = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;
    const dataNascimentoNaoEstaCerto = !padraoDeData.test(
      usuario.dataNascimento
    );
    if (dataNascimentoNaoEstaCerto) {
      errors.push({
        message:
          'Data de nascimento está inválido. O formato deve ser dd/mm/aaaa'
      });
    }

    const padraoDeEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailNaoEstaCerto = !padraoDeEmail.test(usuario.email);
    if (emailNaoEstaCerto) {
      errors.push({
        message: 'Email inválido.'
      });
    }

    const nome = usuario.nome.trim();
    const nomeNaoEstaCerto = !(nome.length >= 3);
    if (nomeNaoEstaCerto) {
      errors.push({
        message: 'Nome deve ter no mínimo 3 caracteres.'
      });
    }

    return { errors };
  }
}
