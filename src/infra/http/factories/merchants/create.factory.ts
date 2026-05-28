import { CreateMerchantController } from '@payment-gateway/infra/controllers/merchant/create.controller';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';

export const injectCreateMerchantController = () => {
  const merchantRepository = new MerchantRepository();
  return new CreateMerchantController(merchantRepository);
};
