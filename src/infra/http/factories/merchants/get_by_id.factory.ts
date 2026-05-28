import { GetMerchantByIdController } from '@payment-gateway/infra/controllers/merchant/get_by_id.controller';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';

export const injectGetMerchantByIdController = () => {
  const merchantRepository = new MerchantRepository();
  return new GetMerchantByIdController(merchantRepository);
};
