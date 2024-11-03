import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute";
import transactionRoutes from "./routes/transactionRoute";
import path from "path";
import multer from "multer";

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
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          error: 'File is too large. Maximum size is 5MB'
        });
      }
      return res.status(400).json({
        error: error.message
      });
    }
    next(error);
  });
  
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);