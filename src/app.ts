import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import userRoutes from "./routes/userRoute";
import transactionRoutes from "./routes/transactionRoute";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(fileupload());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);