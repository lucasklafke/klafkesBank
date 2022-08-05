import { Router } from "express"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { signUp, signIn } from "../controllers/authController.js"
import associateSchema from "../schemas/associateSchema.js"
import authSchema from "../schemas/authSchema.js"
const authRouter = Router()

authRouter.post("/signup", schemaValidator(associateSchema), signUp)
authRouter.post("/signin", schemaValidator(authSchema),signIn)

export default authRouter

