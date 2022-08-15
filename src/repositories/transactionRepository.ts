import { Purchase } from "@prisma/client"
import prisma from "../config/db.js"
type creatingPurchase = Omit<Purchase, "id" | "createdAt">
export async function purchase(data: creatingPurchase){
    return await prisma.purchase.create({
        data
    })
}

export async function deposit(amount : number){
    await prisma.deposit.create({
        data: {
            amount
        }
    })
}
export const transactionRepository = {
    purchase,
    deposit
}