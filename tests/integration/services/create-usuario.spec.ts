import { Database } from '../../../src/database/database';
import { UsuarioRepository } from '../../../src/repositories/usuario.repositories';
import { CreateUsuarioService } from '../../../src/services/create-usuario.services';
import { Usuario } from '../../../src/types';
import { CreateUsuarioValidator } from '../../../src/validators/create-usuario.validators';

describe('CreateUsuarioService', () => {
  let memoryDatabase: Database;

  beforeAll(() => {
    memoryDatabase = Database.getInstance();
  });

  afterEach(() => {
    memoryDatabase.clear();
  });

  test('Deve criar usuário no banco de dados', () => {
    const usuario: Usuario = {
      nome: 'Teste',
      email: 'teste@teste.com.br',
      telefone: '00 1 2345 6789',
      dataNascimento: '18/11/1999'
    };

    const id = 1;

    jest.spyOn(Date, 'now').mockImplementation(() => id);

    const usuarioRepository = new UsuarioRepository(memoryDatabase);
    const createUsuarioValidator = new CreateUsuarioValidator();
    const createUsuarioService = new CreateUsuarioService(
      usuarioRepository,
      createUsuarioValidator
    );
    const result = createUsuarioService.execute(usuario);

    const usuarioBuscado = Database.getInstance().getOne(id.toString())!;

    expect(result.data.usuarioCriado.id).toBe(id.toString());
    expect(result.errors).toHaveLength(0);

    expect(usuarioBuscado.nome).toBe(usuario.nome);
    expect(usuarioBuscado.email).toBe(usuario.email);
    expect(usuarioBuscado.telefone).toBe(usuario.telefone);
    expect(usuarioBuscado.dataNascimento).toBe(usuario.dataNascimento);
  });
});
