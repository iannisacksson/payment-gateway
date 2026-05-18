import { IMerchantRepository } from "@payment-gateway/application/repositories/merchant.repository";

export class MerchantRepository implements IMerchantRepository {
    constructor() {}

    async findById(id: string) {
}