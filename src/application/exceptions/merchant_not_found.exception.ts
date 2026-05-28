import { HttpStatusCode } from '@payment-gateway/infra/http/types';
import { Exception } from '@payment-gateway/shared/exception';

export class MerchantNotFoundException extends Exception {
  constructor(message: string = 'Merchant not found') {
    super(message, HttpStatusCode.NOT_FOUND);
    Object.setPrototypeOf(this, MerchantNotFoundException.prototype);
  }
}
