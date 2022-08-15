import { associateRepository } from "../repositories/associateRepository.js"
import { cardRepository } from "../repositories/cardRepository.js"
import { financialRepository } from "../repositories/financialRepository.js"
export async function getBalance(associateId: number){
        const account = await associateRepository.getAccountByAssociateId(associateId)
        return await financialRepository.getBalance(account.id)
}
export async function invoicePay(associateId:number){
        const account = await associateRepository.getAccountByAssociateId(associateId)
        
        return await financialRepository.invoicePay(account.id)
}

export async function getInvoice(associateId:number){
        const cardAccount = await associateRepository.getCardAccountByAssociateId(associateId)
        return await financialRepository.getInvoice(cardAccount.id)
}
export const financialService = {
        getBalance,
        invoicePay,
        getInvoice
}