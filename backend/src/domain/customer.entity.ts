import { DocumentType } from "./document_type";

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    documentType: DocumentType;
    documentNumber: string;
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
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(data: Partial<ICustomer>) {
        Object.assign(this, data);
    }
}