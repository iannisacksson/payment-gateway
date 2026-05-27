import {
  IMerchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';

export class RejectMerchantUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    // Check if a merchant with the same ID exists
    const existingMerchant = await this.merchantRepository.findById(
      merchant.id
    );
    if (!existingMerchant) {
      throw new Error('Merchant with this ID does not exist');
    }

    if (existingMerchant.status === MerchantStatus.REJECTED) {
      return existingMerchant;
    }

    if (existingMerchant.status !== MerchantStatus.PENDING) {
      throw new Error('Only merchants with PENDING status can be rejected');
    }

    existingMerchant.status = MerchantStatus.REJECTED;

    await this.merchantRepository.update(existingMerchant);

    return existingMerchant;
  }
}
