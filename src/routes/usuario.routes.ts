import express from 'express';
import { Database } from '../database/database';
import { UsuarioRepository } from '../repositories/usuario';
import { FindUsuarioValidator } from '../validators/find-usuario';
import { FindUsuarioService } from '../services/find-usuario';
import { FindUsuarioController } from '../controllers/find-usuario';
import { CreateUsuarioValidator } from '../validators/create-usuario';
import { CreateUsuarioService } from '../services/create-usuario';
import { CreateUsuarioController } from '../controllers/create-usuario';

const router = express.Router();

const database = Database.getInstance();
const usuarioRepository = new UsuarioRepository(database);

function construirFindUsuarioController() {
  const findUsuarioValidator = new FindUsuarioValidator();
  const findUsuarioService = new FindUsuarioService(
    usuarioRepository,
    findUsuarioValidator
  );
  const findUsuarioController = new FindUsuarioController(findUsuarioService);
  return findUsuarioController;
}

function construirCreateUsuarioController() {
  const createUsuarioValidator = new CreateUsuarioValidator();
  const createUsuarioService = new CreateUsuarioService(
    usuarioRepository,
    createUsuarioValidator
  );
  const createUsuarioController = new CreateUsuarioController(
    createUsuarioService
  );
  return createUsuarioController;
}

const findUsuarioController = construirFindUsuarioController();
router.get(
  '/usuarios/:id',
  findUsuarioController.execute.bind(findUsuarioController)
);

const createUsuarioController = construirCreateUsuarioController();
router.post(
  '/usuarios',
  createUsuarioController.execute.bind(createUsuarioController)
);

const usuarioRoutes = router;

export { usuarioRoutes };
