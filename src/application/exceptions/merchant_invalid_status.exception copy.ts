import { HttpStatusCode } from '@payment-gateway/infra/http/types';
import { Exception } from '@payment-gateway/shared/exception';

export class MerchantAlreadyExistsException extends Exception {
  constructor(message: string = 'Merchant already exists') {
    super(message, HttpStatusCode.BAD_REQUEST);
    Object.setPrototypeOf(this, MerchantAlreadyExistsException.prototype);
  }
}
