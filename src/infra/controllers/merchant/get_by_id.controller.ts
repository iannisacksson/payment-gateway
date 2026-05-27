import { Request, Response } from 'express';
import { GetMerchantByIdUseCase } from '@payment-gateway/application/usecases/merchant/get_by_id.usecase';
import { MerchantRepository } from '@payment-gateway/infra/repositories/merchant.repository';
import { Merchant } from '@payment-gateway/domain/merchant.entity';

export class GetMerchantByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const merchantRepository = new MerchantRepository();
      const usecase = new GetMerchantByIdUseCase(merchantRepository);
      const merchant = await usecase.execute(
        new Merchant({ id: request.params.id as string })
      );

      return response.status(200).json(merchant);
    } catch (error: unknown) {
      return response.status(404).json({
        error: (error as Error).message || 'Failed to fetch merchant',
      });
    }
  }
}
