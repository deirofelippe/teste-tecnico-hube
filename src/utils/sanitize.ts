import { Usuario } from '@src/types';

export function sanitize(usuario: Usuario): Usuario {
  usuario.telefone = usuario.telefone.trim().replace(/[^0-9]/g, '');
  usuario.nome = usuario.nome.trim();
  usuario.email = usuario.email.trim();
  usuario.dataNascimento = usuario.dataNascimento.trim();

  return usuario;
}
