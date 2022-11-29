import prisma from "../config/db.js"
import { Account } from "@prisma/client"

type createAccountData = Omit<Account, "id" | "createdAt" | "canceledAt" | "updatedAt" >

export async function getByCpf(cpf : string){
    return await prisma.associate.findFirst({where : {cpf}})
}

export async function getById(associateId : number){
    return await prisma.associate.findFirst({where : {id: associateId}})
}

export async function createAccount(data:createAccountData){
    return await prisma.account.create({
        data: data
    })

}

export async function updateBalance(balance:number, accountId:number){
    return await prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            balance,
            updatedAt: new Date()
        }
    })
}

export const associateRepository = {
    getById,
    getByCpf,
    createAccount,
    updateBalance,
}