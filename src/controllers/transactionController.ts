import { Request, Response } from "express";
import { transactionService } from "../services/transactionService.js";


export async function deposit(req: Request, res: Response){
    const {amount} = req.body
    console.log(amount)
    const { jwtData }= res.locals
    const { associateId }= jwtData
    const balance = await transactionService.deposit(amount,associateId)
    res.send(balance)
}
export interface purchaseReceivedData {
    name: string,
    amount: number,
    card: number,
    password: string
}
export async function purchase(req: Request, res: Response){
    const {name, amount, password,card} = req.body
    const {jwtData} = res.locals.jwtData
    const {associateId} = jwtData
    transactionService.purchase({name,amount,password, card}, associateId)



}

export async function withdraw(){

}
