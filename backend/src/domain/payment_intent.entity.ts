import { ICustomer } from "./customer.entity";
import { IMerchant } from "./merchant.entity";
import { Currency } from "./types";

export interface PaymentIntentStatus {
  PENDING: "PENDING";
  COMPLETED: "COMPLETED";
  FAILED: "FAILED";
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
