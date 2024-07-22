import { Router } from 'express';
import { createTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController';

const transactionRoutes = Router();

transactionRoutes.post('/', createTransaction);
transactionRoutes.get('/', getTransactions);
transactionRoutes.put('/:id', updateTransaction);
transactionRoutes.delete('/:id', deleteTransaction);

export default transactionRoutes;
