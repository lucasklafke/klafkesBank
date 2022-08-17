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

    const {associateId} = res.locals.jwtData
    const associate = await cardService.validateIdentity(associateId, password)

    const request = await cardService.createRequest({income, password, logo, limit, invoice_dueday,type, name, cardPassword},associate)
    if(request.current_status === "declined"){
        return res.status(400).send(request.push_describe)
    }

    const cardAccount = await cardService.createCardAccount({income, password, logo, limit, invoice_dueday,type, name, cardPassword}, associateId)
    const card = await cardService.createCard({income, password, logo, limit, invoice_dueday, type, name, cardPassword},associate,cardAccount.id)
    await cardService.createLimit(cardAccount.id, card.id)
    const copyCard = {
        ...card
    }

    const virtualCard = await cardService.createVirtualCard(copyCard)
    res.status(201).send({card, virtualCard})
}

export async function getCards(req: Request, res: Response){
    const {associateId} = res.locals.jwtData
    const cards = await cardService.getCards(associateId)
    res.send(cards)
}

export async function getCard(req: Request, res: Response){
    const {cardId} = req.params
    const card = await cardService.getCard(Number(cardId))
    res.send(card)
}

export async function changeLimit(req: Request, res:Response){
    const {limit} = req.body
    const {jwtData} = res.locals
    const {associateId} = jwtData
    await cardService.changeLimit(limit,associateId)
    res.sendStatus(200)
}