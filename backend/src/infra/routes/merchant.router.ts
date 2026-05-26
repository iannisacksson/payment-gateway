import { Router } from "express";
import { CreateMerchantController } from "../controllers/merchant/create.controller";

const merchantRouter = Router();

const createMerchantController = new CreateMerchantController();

merchantRouter.post("/", (req, res) => createMerchantController.handle(req, res));

export { merchantRouter  };
