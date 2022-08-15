import { Router } from "express";
import { getBalance, getInvoice, invoicePay } from "../controllers/financialController.js";
import { validateJWT } from "../middlewares/validateToken.js";

const financialRouter = Router();

financialRouter.get("/balance", validateJWT,getBalance)
financialRouter.get("/invoice", validateJWT,getInvoice)
financialRouter.post("/invoice", validateJWT,invoicePay)
export default financialRouter;