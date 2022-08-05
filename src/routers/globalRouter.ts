import {Router} from "express"
import authRouter from "./authRouter.js";

const globalRouter = Router()


globalRouter.use(authRouter)
export default globalRouter;