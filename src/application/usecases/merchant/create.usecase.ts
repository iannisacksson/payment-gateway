import {
  IMerchant,
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';

export class CreateMerchantUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    // Check if a merchant with the same email or document number already exists
    const existingMerchant = await this.merchantRepository.findByEmail(
      merchant.email
    );
    if (existingMerchant) {
      throw new Error('Merchant with this email already exists');
    }

    // Check if a merchant with the same document number already exists
    const existingMerchantByDocument =
      await this.merchantRepository.findByDocumentNumber(
        merchant.documentNumber
      );
    if (existingMerchantByDocument) {
      throw new Error('Merchant with this document number already exists');
    }

    const merchantCreated = await this.merchantRepository.create(
      new Merchant({ ...merchant, status: MerchantStatus.PENDING })
    );

    return merchantCreated;
  }
}
