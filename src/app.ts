import express, {json} from 'express';
import "express-async-errors";
import { errorHandler } from './middlewares/errorHandler.js';
import globalRouter from './routers/globalRouter.js';


const app = express();

app.use(json());
app.use(globalRouter);
app.use(errorHandler)

export default app;