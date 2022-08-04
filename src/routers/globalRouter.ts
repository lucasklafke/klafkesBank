import {Router} from "express"
import authRouter from "./authRouter";

const globalRouter = Router()


globalRouter.use(authRouter)
export default globalRouter;