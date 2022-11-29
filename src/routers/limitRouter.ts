import { Router } from "express";
import { getBalance, getInvoice, getLimit, invoicePay } from "../controllers/financialController.js";
import { validateJWT } from "../middlewares/validateToken.js";

const limitRouter = Router();

// financialRouter.get("/balance", validateJWT,getBalance)
// financialRouter.get("/invoice", validateJWT,getInvoice)
limitRouter.get("/limit",validateJWT,getLimit)
export default limitRouter;