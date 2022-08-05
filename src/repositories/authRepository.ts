import  prisma  from "../config/db.js"
import connection from "../config/db.js"
import { Associate } from "@prisma/client"
import { CreateAssociateData } from "../controllers/authController.js"
export async function getByCpf(cpf : string){
    return await prisma.associate.findFirst({where : {cpf}})
}

export async function create(data : CreateAssociateData){
    const {cpf, password, birthdate, longitude,latitude,name} = data
    return await prisma.associate.create({data: {
        cpf, 
        password, 
        birthdate, 
        longitude,
        latitude,
        name,
        vigencyEndDate: "",
        createdAt: ""        
    }})
}