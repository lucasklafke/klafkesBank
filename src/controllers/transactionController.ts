import { Request, Response } from "express";
import { transactionService } from "../services/transactionService.js";


export async function deposit(req: Request, res: Response){
    const {amount} = req.body
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
    const {jwtData} = res.locals
    const {associateId} = jwtData
    const {invoice_value} = await transactionService.purchase({name,amount,password, card}, associateId)
    
    return res.send({invoice_value})

}

export async function withdraw(){

}

export async function getUsedLimit(req: Request, res: Response){
    const {jwtData} = res.locals.jwtData
    const {associateId} = jwtData
    const used_limit = await transactionService.getUsedLimit(associateId)
    res.send(used_limit)
}