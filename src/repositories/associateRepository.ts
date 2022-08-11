import prisma from "../config/db.js"
import { Account } from "@prisma/client"

type createAccountData = Omit<Account, "id" | "createdAt" | "canceledAt" | "updatedAt" >

export async function getByCpf(cpf : string){
    return await prisma.associate.findFirst({where : {cpf}})
}

export async function getById(associateId : number){
    return await prisma.associate.findFirst({where : {id: associateId}})
}

export async function getAccountByAssociateId(associateId: number){
    return await prisma.account.findFirst({
        where : {
            associateId,
            status: "readyToWork"
        }
    })
}

export async function createAccount(data:createAccountData){
    return await prisma.account.create({
        data: data
    })

}

export async function getCardAccountByAccountId(accountId: number){
    return await prisma.cardAccount.findFirst({
        where: {
            accountId,
            status:"working"
        }
    })
}

export const associateRepository = {
    getById,
    getByCpf,
    getAccountByAssociateId,
    createAccount,
    getCardAccountByAccountId
}