import {Router} from "express"
import authRouter from "./authRouter.js";
import cardRouter from "./cardRouter.js";
import transactionRouter from "./transactionRouter.js";
import financialRouter from "./financialRouter.js";
import limitRouter from "./limitRouter.js";
const globalRouter = Router()


globalRouter.use(authRouter)
globalRouter.use(cardRouter)
globalRouter.use(transactionRouter)
globalRouter.use(financialRouter)
globalRouter.use(limitRouter)
cardRouter.get("/health",(req, res) => {
  res.send('ok').status(200)
})
export default globalRouter;