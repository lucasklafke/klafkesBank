import {Router} from "express"
import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import transactionRouter from "./transactionRouter.js";

const globalRouter = Router()


globalRouter.use(authRouter)
globalRouter.use(cardRouter)
globalRouter.use(transactionRouter)
export default globalRouter;