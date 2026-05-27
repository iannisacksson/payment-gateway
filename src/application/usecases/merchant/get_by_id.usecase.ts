import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';

export class GetMerchantByIdUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    const existingMerchant = await this.merchantRepository.findById(
      merchant.id
    );
    if (!existingMerchant) {
      throw new Error('Merchant with this ID does not exist');
    }
    return existingMerchant;
  }
}
