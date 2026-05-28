import { ApproveMerchantUseCase } from '@payment-gateway/application/usecases/merchant/approve.usecase';
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

type TApproveMerchantRequestParams = Pick<Merchant, 'id'>;

class ApproveMerchantRequestParams implements TApproveMerchantRequestParams {
  id: string;
}

type TApproveMerchantResponse = Pick<Merchant, 'id' | 'name' | 'status'> & {
  created_at: Date;
  updated_at: Date;
};

class ApproveMerchantResponse implements TApproveMerchantResponse {
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

export class ApproveMerchantController implements IController<
  null,
  ApproveMerchantRequestParams,
  null,
  ApproveMerchantResponse
> {
  async handle({
    params,
  }: IHttpRequest<null, ApproveMerchantRequestParams, null>): Promise<
    IHttpResponse<ApproveMerchantResponse>
  > {
    const merchantRepository = new MerchantRepository();
    const usecase = new ApproveMerchantUseCase(merchantRepository);

    const { id } = params;
    const merchant = await usecase.execute(new Merchant({ id }));

    return {
      statusCode: HttpStatusCode.OK,
      body: new ApproveMerchantResponse(merchant),
    };
  }
}
