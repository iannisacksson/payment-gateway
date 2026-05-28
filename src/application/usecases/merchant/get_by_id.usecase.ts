import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';
import { MerchantNotFoundException } from '@payment-gateway/application/exceptions/merchant_not_found.exception';

export class GetMerchantByIdUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    const existingMerchant = await this.merchantRepository.findById(
      merchant.id
    );
    if (!existingMerchant) {
      throw new MerchantNotFoundException();
    }
    return existingMerchant;
  }
}
