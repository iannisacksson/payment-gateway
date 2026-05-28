import { Router } from 'express';
import { ApproveMerchantController } from '@payment-gateway/infra/controllers/merchant/approve.controller';
import { CreateMerchantController } from '@payment-gateway/infra/controllers/merchant/create.controller';
import { GetAllMerchantsController } from '@payment-gateway/infra/controllers/merchant/get_all.controller';
import { GetMerchantByIdController } from '@payment-gateway/infra/controllers/merchant/get_by_id.controller';
import { RejectMerchantController } from '@payment-gateway/infra/controllers/merchant/reject.controller';
import { expressRouter } from '@payment-gateway/infra/http/express/router';

const merchantRouter = Router();

const approveMerchantController = new ApproveMerchantController();
const createMerchantController = new CreateMerchantController();
const getAllMerchantsController = new GetAllMerchantsController();
const getMerchantByIdController = new GetMerchantByIdController();
const rejectMerchantController = new RejectMerchantController();

merchantRouter.get('/', expressRouter(getAllMerchantsController));
merchantRouter.get('/:id', expressRouter(getMerchantByIdController));
merchantRouter.post('/', expressRouter(createMerchantController));
merchantRouter.patch('/:id/approve', expressRouter(approveMerchantController));
merchantRouter.patch('/:id/reject', expressRouter(rejectMerchantController));

export { merchantRouter };
