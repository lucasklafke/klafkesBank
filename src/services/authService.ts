
import { CreateAssociateData } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js"
import * as associateRepository from "../repositories/associateRepository.js"
import { compareBcrypt, encrypt } from "../utils/bcryptFunctions.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {faker} from "@faker-js/faker"

dotenv.config()

async function verifyCpfExist(cpf : string){
    const associate = await authRepository.getByCpf(cpf)
    return associate
   
}
async function generateJWT(cpf : string, associateId : number, associateName: string){
    return jwt.sign({cpf, associateId, associateName}, process.env.JWT_SECRET, {expiresIn : "12h"})
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
    
    const register = await authRepository.create(data)
    if(register){
        await createAccount(register.id)
    }
}

export async function signIn(cpf : string, password : string){
    const associate = await authRepository.getByCpf(cpf)

    validateSignIn(associate, password)

    const token = await generateJWT(cpf, associate.id, associate.name)
    return token
}

export async function createAccount(associateId: number){
    const account_number = faker.finance.account(10)
    const data = {
        account_number,
        status: "readyToWork",
        associateId,
        balance: 0,
        account_type: "current"
    }
    return await associateRepository.createAccount(data)
}

const authService = {
    signUp,
    signIn
}

export default authService;