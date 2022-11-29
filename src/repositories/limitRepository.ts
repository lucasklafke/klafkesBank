import prisma from "../config/db.js"
import { createLimitDto } from "../dto/limit.dto.js"

export async function getLimitByCardAccountId(cardAccountId: number){
    return await prisma.limit.findFirst({
      where: {
        card_account_id: cardAccountId,
        current: true
      }
    })
}

export async function createLimit(data: createLimitDto){
  return await prisma.limit.create({
    data
  })
}
export async function changeLimit(cardAccountId: number, amount : number){
    const result = await prisma.$transaction(async (prisma) => {
      const oldLimit = await prisma.limit.findFirst({
        where: {
          card_account_id: cardAccountId,
          current: true
        }
      })

      oldLimit.current = false

      const newLimit: createLimitDto = {
        card_account_id: cardAccountId,
        current_selected_limit: amount, 
        previous_selected_limit: oldLimit.current_selected_limit, 
        previous_id: oldLimit.id, 
        current:true,
      }
      await prisma.limit.create({
        data: newLimit
      })

      await prisma.limit.update({
        where: {
          id: oldLimit.id
        },
        data: oldLimit
          
        
      })

    })
}
export const limitRepository = {
  getLimitByCardAccountId,
  changeLimit,
  createLimit
}