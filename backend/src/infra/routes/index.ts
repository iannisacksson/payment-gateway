import { Router } from "express";
import healthCheckRouter from "./health_check.router";

const router = Router();

router.use("/health-check", healthCheckRouter);

export default router;
