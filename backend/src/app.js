import express from 'express'
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.use(morgan("dev"))

// User Routers
import userRouter from "./routes/user.route.js"
import userOrder from './routes/order.route.js'
import { availableMeals } from './controller/order.controller.js'

app.use("/api/v1/users", userRouter);
app.use('/orders',userOrder);

export default app;