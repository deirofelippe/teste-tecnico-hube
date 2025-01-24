import { Database } from '@src/database/database.ts';
import { UsuarioRepository } from '@src/repositories/usuario.ts';
import { FindUsuarioService } from '@src/services/find-usuario.ts';
import { Result, Usuario } from '@src/types';
import { FindUsuarioValidator } from '@src/validators/find-usuario.ts';

describe('FindUsuarioService', () => {
  let memoryDatabase: Database;
  const id = '1';
  const usuario: Usuario = {
    nome: 'Teste',
    email: 'teste@teste.com.br',
    telefone: '21912345678',
    dataNascimento: '18/11/1999'
  };

  beforeAll(() => {
    memoryDatabase = Database.getInstance();
    memoryDatabase.put({
      [id]: `{"nome":"${usuario.nome}","email":"${usuario.email}","telefone":"${usuario.telefone}","dataNascimento":"${usuario.dataNascimento}"}`
    });
  });

  afterAll(() => {
    memoryDatabase.clear();
  });

  test('Deve buscar usuário no banco de dados', () => {
    const usuarioRepository = new UsuarioRepository(memoryDatabase);
    const findUsuarioValidator = new FindUsuarioValidator();
    const findUsuarioService = new FindUsuarioService(
      usuarioRepository,
      findUsuarioValidator
    );

    const result: Result = findUsuarioService.execute(id);

    expect(result.errors).toHaveLength(0);

    expect(result.data.usuario.id).toBe(id);
    expect(result.data.usuario.nome).toBe(usuario.nome);
    expect(result.data.usuario.email).toBe(usuario.email);
    expect(result.data.usuario.telefone).toBe(usuario.telefone);
    expect(result.data.usuario.dataNascimento).toBe(usuario.dataNascimento);
  });

  test('Deve retornar erro de usuário inexistente', () => {
    const usuarioRepository = new UsuarioRepository(memoryDatabase);
    const findUsuarioValidator = new FindUsuarioValidator();
    const findUsuarioService = new FindUsuarioService(
      usuarioRepository,
      findUsuarioValidator
    );

    const result: Result = findUsuarioService.execute('6');

    expect(result.errors).toHaveLength(1);
    expect(Object.keys(result.data)).toHaveLength(0);
  });
});
