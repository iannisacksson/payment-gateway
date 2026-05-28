import { GetMerchantByIdUseCase } from '@payment-gateway/application/usecases/merchant/get_by_id.usecase';
import {
  IMerchant,
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { PersonType } from '@payment-gateway/domain/types';
import {
  HttpStatusCode,
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@payment-gateway/infra/http/types';
import { IMerchantRepository } from '@payment-gateway/application/repositories/merchant.repository';

type TGetMerchantByIdRequestParams = Pick<IMerchant, 'id'>;

class GetMerchantByIdRequestParams implements TGetMerchantByIdRequestParams {
  id: string;
}

type TGetMerchantByIdResponse = Pick<
  IMerchant,
  'id' | 'name' | 'status' | 'phone'
> & {
  document_number: string;
  person_type: PersonType;
  created_at: Date;
  updated_at: Date;
};

class GetMerchantByIdResponse implements TGetMerchantByIdResponse {
  id: string;
  name: string;
  status: MerchantStatus;
  document_number: string;
  phone: string;
  person_type: PersonType;
  created_at: Date;
  updated_at: Date;

  constructor(data: IMerchant) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.document_number = data.documentNumber;
    this.phone = data.phone;
    this.person_type = data.personType;
    this.created_at = data.createdAt;
    this.updated_at = data.updatedAt;
  }
}

export class GetMerchantByIdController implements IController<
  null,
  GetMerchantByIdRequestParams,
  null,
  GetMerchantByIdResponse
> {
  constructor(private readonly merchantRepository: IMerchantRepository) {}

  async handle(
    request: IHttpRequest<null, GetMerchantByIdRequestParams, null>
  ): Promise<IHttpResponse<GetMerchantByIdResponse>> {
    const usecase = new GetMerchantByIdUseCase(this.merchantRepository);

    const merchant = await usecase.execute(
      new Merchant({ id: request.params.id })
    );

    return {
      statusCode: HttpStatusCode.OK,
      body: new GetMerchantByIdResponse(merchant),
    };
  }
}
