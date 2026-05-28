import { RejectMerchantController } from '@payment-gateway/infra/controllers/merchant/reject.controller';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';

export const injectRejectMerchantController = () => {
  const merchantRepository = new MerchantRepository();
  return new RejectMerchantController(merchantRepository);
};
