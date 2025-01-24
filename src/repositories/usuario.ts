import { Database } from '@src/database/database';
import { IUsuarioRepository, Usuario } from '@src/types';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(private database: Database) {}

  public create(usuario: Usuario): UsuarioComID {
    const id = Date.now().toString();
    const novoUsuario = JSON.stringify(usuario);

    this.database.put({ [id]: novoUsuario });

    const usuarioComId: UsuarioComID = {
      ...usuario,
      id: id
    };

    return usuarioComId;
  }

  public findOne(id: string): Usuario | undefined {
    return this.database.getOne(id);
  }
}
