import express from 'express';
import { Database } from '../database/database';
import { UsuarioRepository } from '../repositories/usuario.repositories';
import { FindUsuarioValidator } from '../validators/find-usuario.validators';
import { FindUsuarioService } from '../services/find-usuario.services';
import { FindUsuarioController } from '../controllers/find-usuario.controllers';
import { CreateUsuarioValidator } from '../validators/create-usuario.validators';
import { CreateUsuarioService } from '../services/create-usuario.services';
import { CreateUsuarioController } from '../controllers/create-usuario.controllers';

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
