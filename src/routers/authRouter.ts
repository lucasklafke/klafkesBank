import { Router } from "express"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { signUp } from "../controllers/authController.js"
import associateSchema from "../schemas/associateSchema.js"
const authRouter = Router()

authRouter.post("/signup", schemaValidator(associateSchema), signUp)
export default authRouter