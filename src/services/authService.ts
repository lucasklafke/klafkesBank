
import { CreateAssociateData } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js"
import { compareBcrypt, encrypt } from "../utils/bcryptFunctions.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

async function verifyCpfExist(cpf : string){
    const associate = await authRepository.getByCpf(cpf)
    return associate
   
}
async function generateJWT(cpf : string, associateId : number){
    return jwt.sign({cpf, associateId}, process.env.JWT_SECRET, {expiresIn : "1h"})
}

function validateSignIn(associate : any, password: string){
    if(!associate){
        throw {type:"not_found", message:"cpf not registered"}
    }
    const isPasswordValid = compareBcrypt(password, associate.password)
    if(!isPasswordValid){
        throw {type:"invalid password", message:"invalid password"}
    }
}

export async function signUp(data : CreateAssociateData ){
    const associate = await verifyCpfExist(data.cpf)
    if(associate){
        throw {type: "conflict", message: "Cpf already registered"}
    }
    const hashedPassword = encrypt(data.password)
    data.password = hashedPassword
    await authRepository.create(data)
}



export async function signIn(cpf : string, password : string){
    const associate = await authRepository.getByCpf(cpf)

    validateSignIn(associate, password)

    const token = generateJWT(cpf, associate.id)

    return token
}


const authService = {
    signUp,
    signIn
}

export default authService;