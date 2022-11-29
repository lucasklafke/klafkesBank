import { CardAccount } from "@prisma/client";

export interface CreateCardAccountDto {
    accountId:  number;
    approved_limit: number;
    available_limit:  number;
    invoice_dueday: Date;
    invoice_value:  number;
    status: string;
    block_code: string;
    logo: string;
    default_code: string;
    associateId:  number;
}

export type createCardAccountData = Omit<CardAccount, 'id' | 'canceledAt' | 'createdAt'>
export interface receivedCardAccountInfo {
    invoice_dueday: Date 
    logo: string 
    associateId:  number
}