import { IAddress } from "./address.entity";
import { IMerchantDocument } from "./merchant_document.entity";
import { MerchantStatus, PersonType } from "./types";

export interface IMerchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: MerchantStatus;
  address: IAddress;
  documents?: IMerchantDocument[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Merchant implements IMerchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: MerchantStatus;
  address: IAddress;
  documents?: IMerchantDocument[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<IMerchant>) {
    Object.assign(this, data);
  }
}
