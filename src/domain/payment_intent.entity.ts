import { ICustomer } from '@payment-gateway/domain/customer.entity';
import { IMerchant } from '@payment-gateway/domain/merchant.entity';
import { Currency } from '@payment-gateway/domain/types';

export interface PaymentIntentStatus {
  PENDING: 'PENDING';
  COMPLETED: 'COMPLETED';
  FAILED: 'FAILED';
}

export interface IPaymentIntent {
  id: string;
  customer: ICustomer;
  merchant: IMerchant;
  status: PaymentIntentStatus;
  amount: number;
  currency: Currency;
  completedAt?: Date;
  failedAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class PaymentIntent implements IPaymentIntent {
  id: string;
  customer: ICustomer;
  merchant: IMerchant;
  status: PaymentIntentStatus;
  amount: number;
  currency: Currency;
  completedAt?: Date;
  failedAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<IPaymentIntent>) {
    Object.assign(this, data);
  }
}
