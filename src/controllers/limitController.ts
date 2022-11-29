import { Request, Response } from "express"
import * as limitService from "../services/limitService.js"
export async function changeLimit(req: Request, res:Response){
  const {limit} = req.body
  const {jwtData} = res.locals
  const {associateId} = jwtData
  await limitService.changeLimit(limit,associateId)
  res.sendStatus(200)
}


export async function getLimit(req: Request, res:Response) {
  const {jwtData} = res.locals
  const {associateId} = jwtData
}

