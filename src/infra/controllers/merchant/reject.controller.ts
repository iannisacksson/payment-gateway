import { RejectMerchantUseCase } from '@payment-gateway/application/usecases/merchant/reject.usecase';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';
import {
  IMerchant,
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import {
  HttpStatusCode,
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@payment-gateway/infra/http/types';

type TRejectMerchantRequestParams = Pick<Merchant, 'id'>;

class RejectMerchantRequestParams implements TRejectMerchantRequestParams {
  id: string;
}

type TRejectMerchantResponse = Pick<Merchant, 'id' | 'name' | 'status'> & {
  created_at: Date;
  updated_at: Date;
};

class RejectMerchantResponse implements TRejectMerchantResponse {
  id: string;
  name: string;
  status: MerchantStatus;
  created_at: Date;
  updated_at: Date;

  constructor(data: IMerchant) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.created_at = data.createdAt;
    this.updated_at = data.updatedAt;
  }
}

export class RejectMerchantController implements IController<
  null,
  RejectMerchantRequestParams,
  null,
  RejectMerchantResponse
> {
  async handle(
    request: IHttpRequest<null, RejectMerchantRequestParams, null>
  ): Promise<IHttpResponse<RejectMerchantResponse>> {
    const merchantRepository = new MerchantRepository();
    const usecase = new RejectMerchantUseCase(merchantRepository);
    const merchant = await usecase.execute(
      new Merchant({ id: request.params.id })
    );

    return {
      statusCode: HttpStatusCode.OK,
      body: new RejectMerchantResponse(merchant),
    };
  }
}
