export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ICard {
  id: string;
  token?: string;
  encryptedPan: string;
  brand: string;
  lastFourDigits: string;
  expirationMonth: number;
  expirationYear: number;
  status: CardStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Card implements ICard {
  id: string;
  token?: string;
  encryptedPan: string;
  brand: string;
  lastFourDigits: string;
  expirationMonth: number;
  expirationYear: number;
  status: CardStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(data: Partial<ICard>) {
    Object.assign(this, data);
  }
}
