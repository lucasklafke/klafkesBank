import {Router} from "express"
import { createCard, getCards, getCard, changeLimit } from "../controllers/cardController.js"
import { schemaValidator } from "../middlewares/schemaValidator.js"
import { validateJWT } from "../middlewares/validateToken.js"
import { createCardSchema } from "../schemas/cardSchemas.js"
import { changeLimitSchema } from "../schemas/changeLimitSchema.js"

const cardRouter = Router()

cardRouter.post("/card/create", validateJWT, schemaValidator(createCardSchema), createCard)
cardRouter.get("/cards",validateJWT, getCards)
cardRouter.get("/card/:cardId", validateJWT, getCard)
cardRouter.post("/limit",validateJWT, schemaValidator(changeLimitSchema), changeLimit)
export default cardRouter