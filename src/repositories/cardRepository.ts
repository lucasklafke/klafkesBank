import prisma from "../config/db.js"
import { Card, CardRequest, Limit} from "@prisma/client"
import {createCardData} from "../services/cardService.js"

type CreateRequestData = Omit<CardRequest, "id" | "createdAt">


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

type CreateLimit = Omit<Limit, "id" | "createdAt" | "previous_id" | "vingency_date" | "change_date">
export async function createLimit(data:CreateLimit){
    await prisma.limit.create({
        data
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
    getManyPhysicalCardsByAssociateCPF,
    getCardsByAssociateCpf,
    createCardRequest,
    createProcess,
    getCardByNumber,
    getCardById,
    updateInvoiceValue,
}