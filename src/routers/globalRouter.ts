import {Router} from "express"
import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";

const globalRouter = Router()


globalRouter.use(authRouter)
globalRouter.use(cardRouter)
export default globalRouter;