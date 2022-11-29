import { transactionRepository } from "../repositories/transactionRepository.js";
import {purchaseReceivedData} from "../controllers/transactionController.js"
import {associateRepository} from "../repositories/associateRepository.js"
import {compareBcrypt} from "../utils/bcryptFunctions.js"
import { cardRepository } from "../repositories/cardRepository.js";
import { cardAccountRepository } from "../repositories/cardAccountRepository.js";
import { limitRepository } from "../repositories/limitRepository.js";
import { accountRepository } from "../repositories/accountRepository.js";

async function getAssociate(associateId:number){
    return await associateRepository.getById(associateId)
}



async function purchase(data : purchaseReceivedData, associateId: number){
    const associate = await getAssociate(associateId)
    const passwordValidation = compareBcrypt(data.password,associate.password)


    const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)
    const limit = await limitRepository.getLimitByCardAccountId(cardAccount.id)
    const newUsedLimit = cardAccount.invoice_value + data.amount
    if(newUsedLimit > limit.current_selected_limit ||(cardAccount.invoice_value + data.amount) > limit.current_selected_limit){
        throw {type:"conflict", message:"insufficient limit"}
    }
    if(!passwordValidation){
        throw {type:"unauthorized", message:"invalid password"}
    }
    if(cardAccount.block_code === "blocked"){
        throw {type:"unauthorized", message:"cards blocked"}
    }

    const newPurchase = await transactionRepository.purchase({amount:data.amount,card_account_id:cardAccount.id})
    const used_limit = await limitRepository.changeLimit(limit.id,newUsedLimit)
    const updatedInvoice = Number(data.amount) + Number(cardAccount.invoice_value)
    return await cardRepository.updateInvoiceValue(cardAccount.id,Number(updatedInvoice))
}

async function deposit(amount:number, associateId:number){
    await transactionRepository.deposit(Number(amount))
    const account = await accountRepository.getAccountByAssociateId(associateId)
    const newBalance = Number(account.balance) + Number(amount)
    return await associateRepository.updateBalance(newBalance, account.id)
    
}

async function getInvoiceValue(associateId:number){
    const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)
  
    return cardAccount.invoice_value
}
export const transactionService = {
    purchase,
    deposit,
    getInvoiceValue
}