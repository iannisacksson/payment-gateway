import { Request, Response } from 'express';
import { GetAllMerchantsUseCase } from '@payment-gateway/application/usecases/merchant/get_all.usecase';
import { MerchantRepository } from '@payment-gateway/infra/repositories/merchant.repository';

export class GetAllMerchantsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const merchantRepository = new MerchantRepository();
      const usecase = new GetAllMerchantsUseCase(merchantRepository);
      const page = Number(request.query.page ?? 1);
      const pageSize = Number(request.query.pageSize ?? 10);

      const merchants = await usecase.execute({ page, pageSize });

      return response.status(200).json(merchants);
    } catch (error: unknown) {
      return response.status(400).json({
        error: (error as Error).message || 'Failed to fetch merchants',
      });
    }
  }
}
