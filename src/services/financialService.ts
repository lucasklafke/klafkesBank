import { accountRepository } from "../repositories/accountRepository.js"
import { associateRepository } from "../repositories/associateRepository.js"
import { cardAccountRepository } from "../repositories/cardAccountRepository.js"
import { cardRepository } from "../repositories/cardRepository.js"
import { financialRepository } from "../repositories/financialRepository.js"
import { transactionRepository } from "../repositories/transactionRepository.js"
export async function getBalance(associateId: number){
        const account = await accountRepository.getAccountByAssociateId(associateId)
        return await financialRepository.getBalance(account.id)
}
export async function invoicePay(associateId:number){
        const account = await accountRepository.getAccountByAssociateId(associateId)
        const cardAccount = await cardAccountRepository.getCardAccountByAccountId(account.id)
        if(!cardAccount){
                throw {type:"conflict", message:"Card account doesn't exist"}
        }
        if(account.balance < cardAccount.invoice_value){
                throw {type:"conflict", message:"insufficient balance"}
        }
        await transactionRepository.purchase({amount:cardAccount.invoice_value, card_account_id:cardAccount.id})
        const newBalance = (account.balance - cardAccount.invoice_value)
        await associateRepository.updateBalance(newBalance,account.id)
        return await financialRepository.invoicePay(cardAccount.id)
}

export async function getInvoice(associateId:number){
        const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)
        if(!cardAccount){
                return {invoice_value: "0"}
        }
        return await financialRepository.getInvoice(cardAccount.id)
}

export async function getLimit(associateId:number){
        const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)
        if(!cardAccount){
                return {selected_limit:0}
        }
        return await financialRepository.getLimit(cardAccount.id)
}
export const financialService = {
        getBalance,
        invoicePay,
        getInvoice,
        getLimit
}