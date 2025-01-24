import express from 'express';
import { errorHandling } from './error-handling';
import { healthcheckRoutes } from './routes/healthcheck.routes';
import { usuarioRoutes } from './routes/usuario.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandling);

app.use(healthcheckRoutes);
app.use(usuarioRoutes);

export { app };
