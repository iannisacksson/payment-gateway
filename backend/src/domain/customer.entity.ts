import { IAddress } from "./address.entity";
import { CustomerStatus, DocumentType } from "./types";

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    documentType: DocumentType;
    documentNumber: string;
    address: IAddress;
    status: CustomerStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class Customer implements ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    documentType: DocumentType;
    documentNumber: string;
    address: IAddress;
    status: CustomerStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(data: Partial<ICustomer>) {
        Object.assign(this, data);
    }
}