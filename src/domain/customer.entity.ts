import { ICard } from '@payment-gateway/domain/card.entity';
import { PersonType } from './types';

export enum CustomerStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  personType: PersonType;
  documentNumber: string;
  status: CustomerStatus;
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
  cards?: ICard[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<ICustomer>) {
    Object.assign(this, data);
  }
}
