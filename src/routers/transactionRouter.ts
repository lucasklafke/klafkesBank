import {Router} from "express"
import { purchaseSchema } from "../schemas/purchaseSchema.js"
import { depositSchema } from "../schemas/depositSchema.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateToken.js"
import { deposit, purchase } from "../controllers/transactionController.js"
const transactionRouter = Router()

transactionRouter.post("/purchase",validateJWT,schemaValidator(purchaseSchema),purchase)
transactionRouter.post("/deposit",validateJWT,schemaValidator(depositSchema),deposit)

export default transactionRouter