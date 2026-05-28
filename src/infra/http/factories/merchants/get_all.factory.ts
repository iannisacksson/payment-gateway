import { GetAllMerchantsController } from '@payment-gateway/infra/controllers/merchant/get_all.controller';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';

export const injectGetAllMerchantsController = () => {
  const merchantRepository = new MerchantRepository();
  return new GetAllMerchantsController(merchantRepository);
};
