import express from "express";
import cors from "cors";
import fileupload from "express-fileupload";
import userRoutes from "./routes/userRoute";
import transactionRoutes from "./routes/transactionRoute";

export const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

declare global {
    namespace Express {
        interface Request {
            user?: Record<string, any>
        }
    }
}

app.use(cors(corsOptions));
app.use(fileupload());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);