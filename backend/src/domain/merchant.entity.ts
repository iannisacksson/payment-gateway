export interface IMerchant {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class Merchant implements IMerchant {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(data: Partial<IMerchant>) {
        Object.assign(this, data);
    }
}