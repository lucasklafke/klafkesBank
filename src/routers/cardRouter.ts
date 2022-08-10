import {Router} from "express"
import { createCard, getCards } from "../controllers/cardController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateToken.js"
import { createCardSchema } from "../schemas/cardSchemas.js"

const cardRouter = Router()

cardRouter.post("/card/create", validateJWT, schemaValidator(createCardSchema), createCard)
cardRouter.get("/cards",validateJWT, getCards)

export default cardRouter