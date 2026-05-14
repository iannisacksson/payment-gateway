import { MerchantDocumentStatus } from "./types";

export interface IMerchantDocument {
  id: string;
  name: string;
  type: DocumentType;
  status: MerchantDocumentStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class MerchantDocument implements IMerchantDocument {
  id: string;
  name: string;
  type: DocumentType;
  status: MerchantDocumentStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<IMerchantDocument>) {
    Object.assign(this, data);
  }
}
