export type Result = {
  errors: ValidatorErrors['errors'];
  data: any;
};

export type ValidatorErrors = { errors: { message: string }[] };

export interface IUsuarioRepository {
  create(usuario: Usuario): void;
  findOne(id: string): Usuario | undefined;
}

export interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
}

export interface UsuarioComID {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
}

export interface IDatabase {
  getOne(id: string): Usuario | undefined;
  put(data: Record<string, string>): void;
}
