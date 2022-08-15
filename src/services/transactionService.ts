import { transactionRepository } from "../repositories/transactionRepository.js";
import {purchaseReceivedData} from "../controllers/transactionController.js"
import {associateRepository} from "../repositories/associateRepository.js"
import {compareBcrypt} from "../utils/bcryptFunctions.js"
import { cardRepository } from "../repositories/cardRepository.js";

async function getAssociate(associateId:number){
    return await associateRepository.getById(associateId)
}



async function purchase(data : purchaseReceivedData, associateId: number){
    const associate = await getAssociate(associateId)
    const passwordValidation = compareBcrypt(data.password,associate.password)


    const cardAccount = await associateRepository.getCardAccountByAssociateId(associateId)
    const limit = await cardRepository.getLimit(cardAccount.id)
    const newUsedLimit = limit.used_limit + data.amount
    if(newUsedLimit > limit.current_limit){
        throw {type:"conflict", message:"insufficient limit"}
    }
    if(!passwordValidation){
        throw {type:"unauthorized", message:"invalid password"}
    }
    if(cardAccount.block_code === "blocked"){
        throw {type:"unauthorized", message:"cards blocked"}
    }
    if((cardAccount.invoice_value + data.amount) > cardAccount.selected_limit){
        throw {type:"conflict", message:"insufficient limit"}
    }

    const newPurchase = await transactionRepository.purchase({amount:data.amount,card_id:data.card})
    const used_limit = await cardRepository.updateUsedLimit(limit.id,newUsedLimit)
    const updatedInvoice = Number(data.amount) + Number(cardAccount.invoice_value)
    return await cardRepository.updateInvoiceValue(cardAccount.id,Number(updatedInvoice))
}

async function deposit(amount:number, associateId:number){
    await transactionRepository.deposit(Number(amount))
    const account = await associateRepository.getAccountByAssociateId(associateId)
    const newBalance = Number(account.balance) + Number(amount)
    return await associateRepository.updateBalance(newBalance, account.id)
    
}

async function getUsedLimit(associateId:number){
    const cardAccount = await associateRepository.getCardAccountByAssociateId(associateId)
    const limit = await cardRepository.getLimit(cardAccount.id)
    const used_limit = limit.used_limit
    return used_limit
}
export const transactionService = {
    purchase,
    deposit,
    getUsedLimit
}