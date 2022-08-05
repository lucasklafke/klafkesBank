import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()
export function encrypt(string : string){
    const salt : number = Number(process.env.BCRYPT_SALT)
    const hashPassword = bcrypt.hashSync(string, salt)
    return hashPassword
}

export function compareBcrypt(string : string, hashString: string){
    return bcrypt.compare(string, hashString)

}