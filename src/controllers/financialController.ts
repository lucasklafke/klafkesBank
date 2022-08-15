import { Request, Response } from "express";
import {financialService} from "../services/financialService.js"
export async function getBalance(req: Request, res: Response){
        const {jwtData} = res.locals
        const {associateId} = jwtData
        const balance = await financialService.getBalance(associateId)
        res.send(balance)
}

export async function getInvoice(req: Request, res: Response){
        const {jwtData} = res.locals
        const {associateId} = jwtData
        const {invoice_value} = await financialService.getInvoice(associateId)
        return res.send({invoice_value})
}

export async function invoicePay(req: Request, res: Response){
        const {jwtData} = res.locals
        const {associateId} = jwtData
        const invoicePay = await financialService.invoicePay(associateId)
        return res.status(200).send({invoicePay})
}