import request from 'supertest';
import { Database } from '../../src/database/database';
import { Usuario } from '../../src/types';
import { app } from '../../src/express';

describe('POST /usuarios', () => {
  let memoryDatabase: Database;

  beforeAll(() => {
    memoryDatabase = Database.getInstance();
  });

  afterEach(() => {
    memoryDatabase.clear();
  });

  test('Deve criar usuário no banco de dados', async () => {
    const usuario: Usuario = {
      nome: 'Teste',
      email: 'teste@teste.com.br',
      telefone: '00 1 2345 6789',
      dataNascimento: '18/11/1999'
    };

    const usuarioEsperado: Usuario = {
      nome: 'Teste',
      email: 'teste@teste.com.br',
      telefone: '00123456789',
      dataNascimento: '18/11/1999'
    };

    const response = await request(app)
      .post('/usuarios')
      .send(usuario)
      .expect(201);

    const usuarioDoResponse = response.body.usuarioCriado;
    const usuarioDoBanco = memoryDatabase.getOne(usuarioDoResponse.id)!;

    expect(typeof Number(usuarioDoResponse.id)).toBe('number');

    expect(usuarioDoResponse.nome).toBe(usuarioEsperado.nome);
    expect(usuarioDoResponse.email).toBe(usuarioEsperado.email);
    expect(usuarioDoResponse.telefone).toBe(usuarioEsperado.telefone);
    expect(usuarioDoResponse.dataNascimento).toBe(
      usuarioEsperado.dataNascimento
    );

    expect(usuarioDoBanco.nome).toBe(usuarioEsperado.nome);
    expect(usuarioDoBanco.email).toBe(usuarioEsperado.email);
    expect(usuarioDoBanco.telefone).toBe(usuarioEsperado.telefone);
    expect(usuarioDoBanco.dataNascimento).toBe(usuarioEsperado.dataNascimento);
  });
});
