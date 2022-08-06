import express, {json} from 'express';
import "express-async-errors";
import { errorHandler } from './middlewares/errorHandler.js';
import globalRouter from './routers/globalRouter.js';
import cors from "cors"

const app = express();

app.use(json());
app.use(cors())
app.use(globalRouter);
app.use(errorHandler)

export default app;