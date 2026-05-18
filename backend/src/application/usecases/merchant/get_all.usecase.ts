import { IMerchant } from "@payment-gateway/domain/merchant.entity";
import { IMerchantRepository } from "@payment-gateway/application/repositories/merchant.repository";
import {
  Pagination,
  TPaginationResponse,
} from "@payment-gateway/shared/pagination";

export class GetAllMerchantsUseCase {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async execute(
    pagination: Pagination,
  ): Promise<TPaginationResponse<IMerchant>> {
    const merchants = await this.merchantRepository.findAll(pagination);
    return merchants;
  }
}
