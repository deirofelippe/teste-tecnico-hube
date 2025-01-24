import request from 'supertest';
import { Database } from '../../src/database/database';
import { app } from '../../src/express';
import { UsuarioComID } from '../../src/types';

describe('GET /usuarios/:id', () => {
  let memoryDatabase: Database;

  beforeAll(() => {
    memoryDatabase = Database.getInstance();
    memoryDatabase.put({
      '1': '{"nome":"Teste","email":"teste@teste.com.br","telefone":"00123456789","dataNascimento":"18/11/1999"}'
    });
  });

  afterEach(() => {
    memoryDatabase.clear();
  });

  test('Deve buscar usuário no banco de dados', async () => {
    const id = '1';

    const response = await request(app).get(`/usuarios/${id}`).expect(200);

    const usuarioEsperado: UsuarioComID = {
      id: id,
      nome: 'Teste',
      email: 'teste@teste.com.br',
      telefone: '00123456789',
      dataNascimento: '18/11/1999'
    };

    const usuarioDoResponse = response.body.usuario;

    expect(usuarioDoResponse.id).toBe(usuarioEsperado.id);
    expect(usuarioDoResponse.nome).toBe(usuarioEsperado.nome);
    expect(usuarioDoResponse.email).toBe(usuarioEsperado.email);
    expect(usuarioDoResponse.telefone).toBe(usuarioEsperado.telefone);
    expect(usuarioDoResponse.dataNascimento).toBe(
      usuarioEsperado.dataNascimento
    );
  });
});
