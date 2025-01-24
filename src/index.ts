import { Database } from './database/database';
import { app } from './express';

Database.getInstance();

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});
