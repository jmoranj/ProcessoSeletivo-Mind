import { Router } from 'express';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction,  } from '../controllers/transactionController';
import { auth } from '../middlewares/auth';
import { upload } from '../middlewares/uploadFile';

const transactionRoutes = Router();

transactionRoutes.use(auth);

transactionRoutes.post('/', upload.single('image'), createTransaction);
transactionRoutes.get('/', getTransactions);
transactionRoutes.put('/:id', upload.single('image'), updateTransaction);
transactionRoutes.delete('/:id', deleteTransaction);

export default transactionRoutes;