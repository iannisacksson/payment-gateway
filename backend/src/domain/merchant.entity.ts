import { IAddress } from "./address.entity";
import { MerchantStatus } from "./types";

export interface IMerchant {
    id: string;
    name: string;
    email: string;
    phone: string;
    documentType: DocumentType;
    documentNumber: string;
    status: MerchantStatus;
    address: IAddress;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class Merchant implements IMerchant {
    id: string;
    name: string;
    email: string;
    phone: string;
    documentType: DocumentType;
    documentNumber: string;
    status: MerchantStatus;
    address: IAddress;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(data: Partial<IMerchant>) {
        Object.assign(this, data);
    }
}