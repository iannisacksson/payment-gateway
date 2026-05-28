import { Router } from 'express';
import { expressRouter } from '@payment-gateway/infra/http/express/router';
import { injectCreateMerchantController } from '@payment-gateway/infra/http/factories/merchants/create.factory';
import { injectGetAllMerchantsController } from '@payment-gateway/infra/http/factories/merchants/get_all.factory';
import { injectGetMerchantByIdController } from '@payment-gateway/infra/http/factories/merchants/get_by_id.factory';
import { injectApproveMerchantController } from '@payment-gateway/infra/http/factories/merchants/approve.factory';
import { injectRejectMerchantController } from '@payment-gateway/infra/http/factories/merchants/reject.factory';

const merchantRouter = Router();

merchantRouter.get('/', expressRouter(injectGetAllMerchantsController()));
merchantRouter.get('/:id', expressRouter(injectGetMerchantByIdController()));
merchantRouter.post('/', expressRouter(injectCreateMerchantController()));
merchantRouter.patch(
  '/:id/approve',
  expressRouter(injectApproveMerchantController())
);
merchantRouter.patch(
  '/:id/reject',
  expressRouter(injectRejectMerchantController())
);

export { merchantRouter };
