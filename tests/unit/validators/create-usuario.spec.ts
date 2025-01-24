import { Usuario } from '../../../src/types';
import { CreateUsuarioValidator } from '../../../src/validators/create-usuario';

describe('CreateUsuarioValidator', () => {
  describe('Erros', () => {
    test.each([['      '], ['  a  '], ['aa']])(
      'Deve dar erro no nome',
      (nome) => {
        const usuario: Usuario = {
          nome: nome,
          email: 'teste@teste.com.br',
          telefone: '912345678',
          dataNascimento: '18/11/1999'
        };

        const createUsuarioValidator = new CreateUsuarioValidator();
        const validatorErrors = createUsuarioValidator.validate(usuario);

        expect(validatorErrors.errors).toHaveLength(1);
      }
    );

    test.each([['teste'], ['teste@e'], ['teste@E.']])(
      'Deve dar erro no email',
      (email) => {
        const usuario: Usuario = {
          nome: 'Teste',
          email: email,
          telefone: '11 9 2345 6789',
          dataNascimento: '18/11/1999'
        };

        const createUsuarioValidator = new CreateUsuarioValidator();
        const validatorErrors = createUsuarioValidator.validate(usuario);

        expect(validatorErrors.errors).toHaveLength(1);
      }
    );

    test.each([['teste'], ['teste@e'], ['teste@E.']])(
      'Deve dar erro na dataDeNascimento',
      (dataDeNascimento) => {
        const usuario: Usuario = {
          nome: 'Teste',
          email: 'teste@teste.com.br',
          telefone: '11 9 2345 6789',
          dataNascimento: dataDeNascimento
        };

        const createUsuarioValidator = new CreateUsuarioValidator();
        const validatorErrors = createUsuarioValidator.validate(usuario);

        expect(validatorErrors.errors).toHaveLength(1);
      }
    );

    test.each([['1234567'], ['123456789012']])(
      'Deve dar erro no telefone',
      (telefone) => {
        const usuario: Usuario = {
          nome: 'Teste',
          email: 'teste@teste.com.br',
          telefone: telefone,
          dataNascimento: '18/11/1999'
        };

        const createUsuarioValidator = new CreateUsuarioValidator();
        const validatorErrors = createUsuarioValidator.validate(usuario);

        expect(validatorErrors.errors).toHaveLength(1);
      }
    );
  });

  describe('Sucessos', () => {});
});
