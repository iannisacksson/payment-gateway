import {
  IMerchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';
import { MerchantNotFoundException } from '@payment-gateway/application/exceptions/merchant_not_found.exception';
import { MerchantInvalidStatusException } from '@payment-gateway/application/exceptions/merchant_invalid_status.exception';

export class RejectMerchantUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    // Check if a merchant with the same ID exists
    const existingMerchant = await this.merchantRepository.findById(
      merchant.id
    );
    if (!existingMerchant) {
      throw new MerchantNotFoundException();
    }

    if (existingMerchant.status === MerchantStatus.REJECTED) {
      return existingMerchant;
    }

    if (existingMerchant.status !== MerchantStatus.PENDING) {
      throw new MerchantInvalidStatusException(
        'Only merchants with PENDING status can be rejected'
      );
    }

    existingMerchant.status = MerchantStatus.REJECTED;

    await this.merchantRepository.update(existingMerchant);

    return existingMerchant;
  }
}
