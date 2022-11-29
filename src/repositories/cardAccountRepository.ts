import prisma from "../config/db.js"
import { CreateCardAccount } from "../dto/card-account.dto.js"

// export async function createCardAccount(data: CreateCardAccount){
//   return await prisma.cardAccount.create({
//     data
//   })
// }

export async function createCardAccount(data: CreateCardAccount) {
  const cardAccount = await prisma.cardAccount.create({data})
}

export async function getCardAccountByAssociateId(associateId:number){
  return await prisma.cardAccount.findFirst({
      where: {
          associateId,
          status:"working"
      }
  })

}

export async function getCardAccountByAccountId(accountId: number){
  return await prisma.cardAccount.findFirst({
      where: {
          accountId,
          status:"working"
      }
  })
}

export const cardAccountRepository = {
  createCardAccount,
  getCardAccountByAssociateId,
  getCardAccountByAccountId
}