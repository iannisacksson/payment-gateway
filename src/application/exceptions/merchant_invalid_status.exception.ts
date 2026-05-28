import { HttpStatusCode } from '@payment-gateway/infra/http/types';
import { Exception } from '@payment-gateway/shared/exception';

export class MerchantInvalidStatusException extends Exception {
  constructor(message: string = 'Merchant has an invalid status') {
    super(message, HttpStatusCode.BAD_REQUEST);
    Object.setPrototypeOf(this, MerchantInvalidStatusException.prototype);
  }
}
