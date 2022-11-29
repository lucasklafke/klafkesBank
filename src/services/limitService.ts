import { associateRepository } from "../repositories/associateRepository.js"
import { cardAccountRepository } from "../repositories/cardAccountRepository.js"
import { limitRepository } from "../repositories/limitRepository.js"

export async function changeLimit(limit : number, associateId: number){
  const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)
  if(!cardAccount) throw { message: 'card account not found', type: 'not_found'}
  await limitRepository.changeLimit(limit, cardAccount.id) 
}



export async function createLimit(card_account_id:number){
  const limitData = {
      card_account_id,
      current_selected_limit: 700,
      previous_selected_limit:null,
      current: true,
  }
  return await limitRepository.createLimit(limitData)
}

export async function getLimit(associateId: number) {
  const cardAccount = await cardAccountRepository.getCardAccountByAssociateId(associateId)

}