import { Router } from 'express';
import { ApproveMerchantController } from '../controllers/merchant/approve.controller';
import { CreateMerchantController } from '../controllers/merchant/create.controller';
import { GetAllMerchantsController } from '../controllers/merchant/get_all.controller';
import { GetMerchantByIdController } from '../controllers/merchant/get_by_id.controller';
import { RejectMerchantController } from '../controllers/merchant/reject.controller';

const merchantRouter = Router();

const approveMerchantController = new ApproveMerchantController();
const createMerchantController = new CreateMerchantController();
const getAllMerchantsController = new GetAllMerchantsController();
const getMerchantByIdController = new GetMerchantByIdController();
const rejectMerchantController = new RejectMerchantController();

merchantRouter.get('/', (req, res) =>
  getAllMerchantsController.handle(req, res)
);
merchantRouter.get('/:id', (req, res) =>
  getMerchantByIdController.handle(req, res)
);
merchantRouter.post('/', (req, res) =>
  createMerchantController.handle(req, res)
);
merchantRouter.patch('/:id/approve', (req, res) =>
  approveMerchantController.handle(req, res)
);
merchantRouter.patch('/:id/reject', (req, res) =>
  rejectMerchantController.handle(req, res)
);

export { merchantRouter };
