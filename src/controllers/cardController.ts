import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"
export interface receivedData {
    income: number,
    password: string,
    logo : string,
    limit: number,
    invoice_dueday: string,
    type: string,
    name: string,
    cardPassword: string
}
export async function createCard(req: Request, res: Response){
    const {income, password, logo, limit, invoice_dueday, type, name, cardPassword} = req.body
    console.log(req.body)
    const {associateId} = res.locals.jwtData
    const associate = await cardService.validateIdentity(associateId, password)
    const request = await cardService.createRequest({income, password, logo, limit, invoice_dueday,type, name, cardPassword},associate)
    console.log(associateId)
    if(request.current_status === "declined"){
        return res.status(400).send(request.push_describe)
    }

    const cardAccount = await cardService.createCardAccount({income, password, logo, limit, invoice_dueday,type, name, cardPassword}, associateId)
    const card = await cardService.createCard({income, password, logo, limit, invoice_dueday, type, name, cardPassword},associate)
    const cardCopy = card
    const virtualCard = await cardService.createVirtualCard(cardCopy)
    res.status(201).send(card)
}


export async function getCards(req: Request, res: Response){
    const {associateId} = res.locals.jwtData
    const cards = await cardService.getCards(associateId)
    res.send(cards)
}