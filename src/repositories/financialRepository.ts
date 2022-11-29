import prisma from "../config/db.js"

export async function getBalance(accountId: number){
    return await prisma.account.findFirst({
        where: {
            id: accountId
        },select: {
                balance: true
        }
    })
}

export async function getInvoice(accountId: number){
    return await prisma.cardAccount.findFirst({
        where: {
            id: accountId
        },
        select: {
            invoice_value: true
        }
    })
}

export async function invoicePay(accountId: number){
    return await prisma.cardAccount.update({
        where: {
            id: accountId
        },
        data: {
            invoice_value: 0
        }
    })
}

export async function getLimit(accountId:number){
    return await prisma.cardAccount.findFirst({
        where:{
            id:accountId
        },
        select:{
            Limit: true
        }
    })

}

export const financialRepository = {
        getBalance,
        invoicePay,
        getInvoice,
        getLimit
}