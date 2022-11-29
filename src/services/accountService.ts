import { accountRepository } from "../repositories/accountRepository.js";

export async function getAccountByAssociateId(associateId: number) {
  const account = await accountRepository.getAccountByAssociateId(associateId)
  if(!account) throw {message: 'account not found', type: 'not_found'}
  return account
}