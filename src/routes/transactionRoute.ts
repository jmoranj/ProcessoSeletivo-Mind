import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';
import { auth } from '../middlewares/auth';

const transactionRoutes = Router();

transactionRoutes.use(auth);

transactionRoutes.post('/', createTransaction);
transactionRoutes.get('/', getTransactions);
transactionRoutes.put('/:id', updateTransaction);
transactionRoutes.delete('/:id', deleteTransaction);

export default transactionRoutes;
