import prisma from "../config/db.js";

export async function getAccountByAssociateId(associateId: number){
  return await prisma.account.findFirst({
      where : {
          associateId
      }
  })
}

export const accountRepository = {
  getAccountByAssociateId
}