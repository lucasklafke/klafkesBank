import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export async function validateJWT(req: Request, res: Response, next: NextFunction) {
    
    const authorization = req.headers["authorization"];
    if(!authorization){
        throw {type: "unauthorized", message: "Authorization missing, or invalid"}
    }
    const token : string = authorization.replace("Bearer ", "").trim()
    if (!token) {
        throw {type : "unauthorized", message : "No token provided"}
    }
    
    const jwtData  = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtData  = jwtData;
    next();
}