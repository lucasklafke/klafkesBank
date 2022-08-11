import prisma from "../config/db.js"
import { Card, CardRequest } from "@prisma/client"
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
            limit:true,
            password:true,
            cpf:true,
            type:true
        }
    })
    return card
}

export async function createCardAccount(createCardAccountData : createCardAccountData){
    return await prisma.cardAccount.create({
        data:createCardAccountData
    })
}

export async function getManyPhysicalCardsByAssociateCPF(cpf: string){
    return await prisma.card.findMany({
        where: {
            type: "physical"
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
            number: true,
            name: true,
            cvv:true,
            logo: true,
            type: true,
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

export const cardRepository = {
    createCard,
    createCardAccount,
    getManyPhysicalCardsByAssociateCPF,
    getCardsByAssociateCpf,
    createCardRequest,
    createProcess,
    getCardByNumber,
    getCardById
}