import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';
import { MerchantModel } from '@payment-gateway/infra/database/sequelize/models/merchant.model';
import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import {
  Pagination,
  TPaginationResponse,
} from '@payment-gateway/shared/pagination';

export class MerchantRepository implements IMerchantRepository {
  async findById(id: string): Promise<IMerchant | null> {
    return MerchantModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<IMerchant | null> {
    return MerchantModel.findOne({ where: { email } });
  }

  async findByDocumentNumber(
    documentNumber: string
  ): Promise<IMerchant | null> {
    return MerchantModel.findOne({ where: { documentNumber } });
  }

  async create(merchant: IMerchant): Promise<void> {
    await MerchantModel.create(merchant);
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
      data: rows,
      pageTotal: rows.length,
      page: Number(page),
      pageSize: Number(pageSize),
      total: count,
    };
  }
}
