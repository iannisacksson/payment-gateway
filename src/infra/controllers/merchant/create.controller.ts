import { CreateMerchantUseCase } from '@payment-gateway/application/usecases/merchant/create.usecase';
import {
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';
import {
  HttpStatusCode,
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@payment-gateway/infra/http/types';
import { PersonType } from '@payment-gateway/domain/types';

type TCreateMerchantRequestBody = Pick<Merchant, 'name' | 'email' | 'phone'> & {
  document_number: string;
  person_type: PersonType;
};

export class CreateMerchantRequestBody implements TCreateMerchantRequestBody {
  name: string;
  email: string;
  document_number: string;
  phone: string;
  person_type: PersonType;
}

export type TCreateMerchantResponse = Pick<
  Merchant,
  'id' | 'name' | 'status'
> & {
  created_at: Date;
};

export class CreateMerchantResponse implements TCreateMerchantResponse {
  id: string;
  name: string;
  status: MerchantStatus;
  created_at: Date;

  constructor(data: Merchant) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.created_at = data.createdAt;
  }
}

export class CreateMerchantController implements IController<
  CreateMerchantRequestBody,
  null,
  null,
  CreateMerchantResponse
> {
  async handle(
    request: IHttpRequest<CreateMerchantRequestBody, null, null>
  ): Promise<IHttpResponse<CreateMerchantResponse>> {
    const merchantRepository = new MerchantRepository();
    const usecase = new CreateMerchantUseCase(merchantRepository);
    const { name, email, document_number, phone, person_type } = request.body;
    const merchant = new Merchant({
      name,
      email,
      documentNumber: document_number,
      phone,
      personType: person_type,
    });

    const merchantCreated = await usecase.execute(merchant);

    return {
      statusCode: HttpStatusCode.CREATED,
      body: new CreateMerchantResponse(merchantCreated),
    };
  }
}
