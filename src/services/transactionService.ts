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
    const account = await associateRepository.getAccountByAssociateId(associateId)
    const cardAccount = await associateRepository.getCardAccountByAccountId(account.id)
    const limit = await cardRepository.getLimit(cardAccount.id)

    const newUsedLimit = limit.used_limit + data.amount
    if(newUsedLimit > limit.current_limit){
        throw {type:"conflict", message:"insufficient limit"}
    }

    const newPurchase = await transactionRepository.purchase({amount:data.amount,card_id:data.card})
    const used_limit = await cardRepository.updateLimit(limit.id,newUsedLimit )
}

async function deposit(amount:number, associateId:number){
    await transactionRepository.deposit(amount)
    const account = await associateRepository.getAccountByAssociateId(associateId)
    console.log("AAAA",amount, account.balance)
    const newBalance = Number(account.balance) + amount
    console.log(newBalance)
    return await associateRepository.updateBalance(newBalance, account.id)
    
}
export const transactionService = {
    purchase,
    deposit
}