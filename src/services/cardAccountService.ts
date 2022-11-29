import { receivedCardAccountInfo } from "../dto/card-account.dto.js"
import * as accountService from "../services/accountService.js"
import { cardAccountRepository } from "../repositories/cardAccountRepository.js"

export async function getAvailableLimit() {

}

export async function createCardAccount(cardAccountData : receivedCardAccountInfo){
  
  const account = await accountService.getAccountByAssociateId(cardAccountData.associateId)
  if(!account) throw {message: 'Account not found', type: 'not_found'}
  const cardAccount = await cardAccountRepository.getCardAccountByAccountId(account.id)
  if(cardAccount){
      return cardAccount
  }


  const date = new Date()
  const year = date.getFullYear() + 5
  const month = date.getMonth()
  const dueday = new Date(`${year}-${month}-${cardAccountData.invoice_dueday}`)
  const createCardAccountData = {
      associateId: cardAccountData.associateId,
      accountId: account.id,
      approved_limit: 700,
      available_limit: 700,
      dueday: dueday,
      logo: cardAccountData.logo,
      status: "working",
      block_code: "working123",
      default_code: "working123",
      invoice_value: 0
  }
  return await cardAccountRepository.createCardAccount(createCardAccountData)
}