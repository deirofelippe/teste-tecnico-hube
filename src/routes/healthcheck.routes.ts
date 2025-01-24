import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/healthz', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Healthy' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

const healthcheckRoutes = router;

export { healthcheckRoutes };
