import { Request, Response } from 'express';
import { RejectMerchantUseCase } from '@payment-gateway/application/usecases/merchant/reject.usecase';
import { MerchantRepository } from '@payment-gateway/infra/repositories/merchant.repository';
import { Merchant } from '@payment-gateway/domain/merchant.entity';

export class RejectMerchantController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const merchantRepository = new MerchantRepository();
      const usecase = new RejectMerchantUseCase(merchantRepository);
      const merchant = await usecase.execute(
        new Merchant({ id: request.params.id as string })
      );

      return response.status(200).json(merchant);
    } catch (error: unknown) {
      return response.status(400).json({
        error: (error as Error).message || 'Failed to reject merchant',
      });
    }
  }
}
