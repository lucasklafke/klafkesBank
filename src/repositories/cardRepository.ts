import prisma from "../config/db.js"
import { Card, CardRequest, Limit} from "@prisma/client"
import {createCardData} from "../services/cardService.js"

type CreateRequestData = Omit<CardRequest, "id" | "createdAt">

import { createCardAccountData } from "../services/cardService.js"

export async function createCardRequest(requestData : CreateRequestData ){
    return await prisma.cardRequest.create({
        data: requestData
    })
}

export async function createProcess(){
    return 1
}

export async function createCard(cardData: createCardData){
    const card =  await prisma.card.create({
        data: cardData,
        select: {
            id: true,
            createdAt:false, 
            blockDate:false, 
            isMainCard: false,
            number:true,
            cvv:true,
            name: true,
            expirationDate:true,
            logo:true,
            password:true,
            cpf:true,
            type:true,
            card_account_id:true
        }
    })
    return card
}

export async function createCardAccount(createCardAccountData : createCardAccountData){
    return await prisma.cardAccount.create({
        data:createCardAccountData
    })
}

type CreateLimit = Omit<Limit, "id" | "createdAt" | "previous_id" | "vingency_date" | "change_date">
export async function createLimit(data:CreateLimit){
    await prisma.limit.create({
        data
    })
}

export async function getLimit(cardAccount:number){
    return await prisma.limit.findFirst({
        where: {
            card_account_id: cardAccount,
            status: "current"
        }
    })

}
export async function updateUsedLimit(id:number,used_limit:number){
    return await prisma.limit.update({
        where: {
            id
        },
        data: {
            used_limit
        }
    })
}

export async function getManyPhysicalCardsByAssociateCPF(cpf: string){
    return await prisma.card.findMany({
        where: {
            type: "physical",
            cpf
        }
    })
}

export async function getManyVirtualCardsByAssociateCPF(cpf: string){
    return await prisma.card.findMany({
        where: {
            type: "virtual"
        }
    })
}

export async function getCardById(cardId: number){
    return await prisma.card.findFirst({
        where: {
            id: cardId
        }
    })
}


export async function getCardsByAssociateCpf(cpf:string){
    const cards = await prisma.card.findMany({
        where: {
            cpf
        },
        select : {
            id:true,
            number: true,
            name: true,
            cvv:true,
            logo: true,
            type: true,
            expirationDate: true,
            createdAt: true,
        }
    })
    return cards
}

export async function getCardByNumber(number: string){
    return await prisma.card.findFirst({
        where: {
            number
        }
    })
}
export async function updateInvoiceValue(id: number, value: number){
    return await prisma.cardAccount.update({
        where: {
            id
        },
        data: {
            invoice_value: value
        }
    })
}

export const cardRepository = {
    createCard,
    createCardAccount,
    getManyPhysicalCardsByAssociateCPF,
    getCardsByAssociateCpf,
    createCardRequest,
    createProcess,
    getCardByNumber,
    getCardById,
    getLimit,
    updateUsedLimit,
    createLimit,
    updateInvoiceValue
}