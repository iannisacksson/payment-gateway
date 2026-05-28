import { Router } from 'express';

const healthCheckRouter = Router();

healthCheckRouter.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export { healthCheckRouter };
