import {
  IMerchant,
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';
import { MerchantAlreadyExistsException } from '@payment-gateway/application/exceptions/merchant_invalid_status.exception copy';

export class CreateMerchantUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(merchant: IMerchant): Promise<IMerchant> {
    // Check if a merchant with the same email or document number already exists
    const existingMerchant = await this.merchantRepository.findByEmail(
      merchant.email
    );
    if (existingMerchant) {
      throw new MerchantAlreadyExistsException(
        'Merchant with this email already exists'
      );
    }

    // Check if a merchant with the same document number already exists
    const existingMerchantByDocument =
      await this.merchantRepository.findByDocumentNumber(
        merchant.documentNumber
      );
    if (existingMerchantByDocument) {
      throw new MerchantAlreadyExistsException(
        'Merchant with this document number already exists'
      );
    }

    const merchantCreated = await this.merchantRepository.create(
      new Merchant({ ...merchant, status: MerchantStatus.PENDING })
    );

    return merchantCreated;
  }
}
