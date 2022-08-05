import { Request, Response } from "express";
import authService from "../services/authService.js"
import {Associate} from "@prisma/client"
export type CreateAssociateData = Omit<Associate, "id" | "vigencyDate" | "vigencyEndDate" | "createdAt" >
export async function signUp(req: Request, res: Response){
    const {cpf, password, birthdate, longitude,latitude,name} : CreateAssociateData= req.body
    await authService.signUp({cpf, password, birthdate, longitude,latitude,name})
}
