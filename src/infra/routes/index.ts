import { Router } from 'express';
import { healthCheckRouter } from './health_check.router';
import { merchantRouter } from './merchant.router';

const router = Router();

router.use('/health-check', healthCheckRouter);
router.use('/merchants', merchantRouter);

export { router };
