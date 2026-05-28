import { ApproveMerchantController } from '@payment-gateway/infra/controllers/merchant/approve.controller';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';

export const injectApproveMerchantController = () => {
  const merchantRepository = new MerchantRepository();
  return new ApproveMerchantController(merchantRepository);
};
