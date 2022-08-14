import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export function encrypt(string) {
    var salt = Number(process.env.BCRYPT_SALT);
    var hashPassword = bcrypt.hashSync(string, salt);
    return hashPassword;
}
export function compareBcrypt(string, hashString) {
    return bcrypt.compare(string, hashString);
}
