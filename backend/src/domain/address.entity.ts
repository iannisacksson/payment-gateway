export interface IAddress {
  id: string;
  line1: string;
  line2?: string;
  state: string;
  postalCode: string;
  country: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Address implements IAddress {
  id: string;
  line1: string;
  line2?: string;
  state: string;
  postalCode: string;
  country: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<IAddress>) {
    Object.assign(this, data);
  }
}
