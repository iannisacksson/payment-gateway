import { IPaymentIntent } from "@payment-gateway/domain/payment_intent.entity";

export interface TransactionStatus {
  PENDING: "PENDING";
  PROCESSING: "PROCESSING";
  AUTHORIZED: "AUTHORIZED";
  CAPTURED: "CAPTURED";
  FAILED: "FAILED";
  REFUNDED: "REFUNDED";
  CANCELED: "CANCELED";
  CHARGEBACK: "CHARGEBACK";
}

export interface ITransaction {
  id: string;
  paymentIntent: IPaymentIntent;
  status: TransactionStatus;
  processedAt?: Date;
  authorizedAt?: Date;
  capturedAt?: Date;
  refundedAt?: Date;
  canceledAt?: Date;
  chargebackAt?: Date;
  failedAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Transaction implements ITransaction {
  id: string;
  paymentIntent: IPaymentIntent;
  status: TransactionStatus;
  processedAt?: Date;
  authorizedAt?: Date;
  capturedAt?: Date;
  refundedAt?: Date;
  canceledAt?: Date;
  chargebackAt?: Date;
  failedAt?: Date;
  failedReason?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<ITransaction>) {
    Object.assign(this, data);
  }
}
