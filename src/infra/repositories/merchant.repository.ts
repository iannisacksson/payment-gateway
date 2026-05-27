import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';
import { MerchantModel } from '@payment-gateway/infra/database/sequelize/models/merchant.model';
import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import {
  Pagination,
  TPaginationResponse,
} from '@payment-gateway/shared/pagination';

export class MerchantRepository implements IMerchantRepository {
  async findById(id: string): Promise<IMerchant | null> {
    const merchant = await MerchantModel.findByPk(id);
    return this.toDomain(merchant);
  }

  async findByEmail(email: string): Promise<IMerchant | null> {
    const merchant = await MerchantModel.findOne({ where: { email } });
    return this.toDomain(merchant);
  }

  async findByDocumentNumber(
    documentNumber: string
  ): Promise<IMerchant | null> {
    const merchant = await MerchantModel.findOne({ where: { documentNumber } });
    return this.toDomain(merchant);
  }

  async create(merchant: IMerchant): Promise<IMerchant> {
    const createdMerchant = await MerchantModel.create(merchant);
    return createdMerchant.toDomain();
  }

  async update(merchant: IMerchant): Promise<void> {
    await MerchantModel.update(merchant, { where: { id: merchant.id } });
  }

  async delete(id: string): Promise<void> {
    await MerchantModel.destroy({ where: { id } });
  }

  async findAll(
    pagination: Pagination
  ): Promise<TPaginationResponse<IMerchant>> {
    const { page, pageSize } = pagination;
    const offset = (Number(page) - 1) * Number(pageSize);
    const { rows, count } = await MerchantModel.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });
    return {
      data: rows?.map(row => row.toDomain()) || [],
      pageTotal: rows.length,
      page: Number(page),
      pageSize: Number(pageSize),
      total: count,
    };
  }

  private toDomain(merchantModel: MerchantModel | null): IMerchant | null {
    return merchantModel?.toDomain() ?? null;
  }
}
