import { MerchantStatus, PersonType } from "./types";

export interface IMerchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: MerchantStatus;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<IMerchant>) {
    Object.assign(this, data);
  }
}
