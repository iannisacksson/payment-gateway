import { IAddress } from "./address.entity";
import { ICard } from "./card.entity";
import { CustomerStatus, PersonType } from "./types";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: CustomerStatus;
  address: IAddress;
  cards?: ICard[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Customer implements ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: CustomerStatus;
  address: IAddress;
  cards?: ICard[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<ICustomer>) {
    Object.assign(this, data);
  }
}
