import { Router } from "express";
import { getBalance, getInvoice, getLimit, invoicePay } from "../controllers/financialController.js";
import { validateJWT } from "../middlewares/validateToken.js";

const financialRouter = Router();

financialRouter.get("/balance", validateJWT,getBalance)
financialRouter.get("/invoice", validateJWT,getInvoice)
financialRouter.post("/invoice", validateJWT,invoicePay)
financialRouter.get("/limit",validateJWT,getLimit)
export default financialRouter;