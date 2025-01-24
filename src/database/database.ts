import { IDatabase, Usuario } from '../types';

export class Database implements IDatabase {
  private static instance: Database;
  private static usuarios: { [id: string]: string }[];

  private constructor() {
    Database.usuarios = [];
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getOne(id: string): Usuario | undefined {
    const usuarioBuscado = Database.usuarios.find(
      (usuarioId): string | undefined => usuarioId[id]
    );

    if (!usuarioBuscado) {
      return undefined;
    }

    const jsonUsuario = Object.values(usuarioBuscado)[0];

    const usuario = JSON.parse(jsonUsuario) as Usuario;

    return usuario;
  }

  public put(data: Record<string, string>): void {
    Database.usuarios.push(data);
  }

  public clear(): void {
    Database.usuarios = [];
  }

  public getAll() {
    return Database.usuarios;
  }
}
