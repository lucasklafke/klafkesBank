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
            id: false,
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

export async function getPhysicalCardByAssociateCPF(cpf: string){
    return await prisma.card.findFirst({
        where: {
            type: "physical"
        }
    })
}


export async function getCardsByAssociateCpf(cpf:string){
    const cards = await prisma.card.findMany({
        orderBy:[
            {type: "asc"}
        ],
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
    console.log(cards)
}