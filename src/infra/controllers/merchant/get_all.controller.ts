import { GetAllMerchantsUseCase } from '@payment-gateway/application/usecases/merchant/get_all.usecase';
import {
  Merchant,
  MerchantStatus,
} from '@payment-gateway/domain/merchant.entity';
import { PersonType } from '@payment-gateway/domain/types';
import { MerchantRepository } from '@payment-gateway/infra/database/sequelize/repositories/merchant.repository';
import {
  HttpStatusCode,
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@payment-gateway/infra/http/types';
import { TPaginationResponse } from '@payment-gateway/shared/pagination';

type TGetAllMerchantsRequestQuery = {
  page?: string;
  page_size?: string;
};

class GetAllMerchantsRequestQuery implements TGetAllMerchantsRequestQuery {
  page?: string;
  page_size?: string;
}

type TGetAllMerchantsResponseItem = Pick<
  Merchant,
  'id' | 'name' | 'status' | 'phone'
> & {
  document_number: string;
  person_type: PersonType;
  created_at: Date;
  updated_at: Date;
};

class GetAllMerchantsResponseItem implements TGetAllMerchantsResponseItem {
  id: string;
  name: string;
  status: MerchantStatus;
  document_number: string;
  phone: string;
  person_type: PersonType;
  created_at: Date;
  updated_at: Date;

  constructor(data: Merchant) {
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

type TGetAllMerchantsResponse = {
  page: number;
  page_size: number;
  total: number;
  data: TGetAllMerchantsResponseItem[];
};

class GetAllMerchantsResponse implements TGetAllMerchantsResponse {
  page: number;
  page_size: number;
  total: number;
  data: GetAllMerchantsResponseItem[];

  constructor(data: TPaginationResponse<Merchant>) {
    this.page = data.page;
    this.page_size = data.pageSize;
    this.total = data.total;
    this.data = data.data.map(item => new GetAllMerchantsResponseItem(item));
  }
}

export class GetAllMerchantsController implements IController<
  null,
  null,
  GetAllMerchantsRequestQuery,
  GetAllMerchantsResponse
> {
  async handle(
    request: IHttpRequest<null, null, GetAllMerchantsRequestQuery>
  ): Promise<IHttpResponse<GetAllMerchantsResponse>> {
    const merchantRepository = new MerchantRepository();
    const usecase = new GetAllMerchantsUseCase(merchantRepository);
    const page = Number(request.query.page ?? 1);
    const pageSize = Number(request.query.page_size ?? 10);

    const result = await usecase.execute({ page, pageSize });

    return {
      statusCode: HttpStatusCode.OK,
      body: new GetAllMerchantsResponse(result),
    };
  }
}
