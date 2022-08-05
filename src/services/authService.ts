
import { CreateAssociateData } from "../controllers/authController.js";
import * as authRepository from "../repositories/authRepository.js"
async function verifyCpfExist(cpf : string){
    const associate = await authRepository.getByCpf(cpf)
    if(associate){
        throw {type:"conflict", message:"cpf already registered"}
    }
}


export async function signUp(data : CreateAssociateData ){
    await verifyCpfExist(data.cpf)

}


const authService = {
    signUp
}

export default authService;