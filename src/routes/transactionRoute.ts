import { Router } from "express";

export const transactionRoute = Router()

transactionRoute.get('/transactions', (req,res) => res.send('Sucesso'))