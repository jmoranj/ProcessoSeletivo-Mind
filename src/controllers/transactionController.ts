import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTransaction(req: Request, res: Response) {
    const { description, value, date, category, type, userId } = req.body;
    
    if (!description || !value || !date || !category || !type || !userId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const transaction = await prisma.transaction.create({
            data: {
                description,
                value: parseFloat(value),
                date: new Date(date),
                category,
                type,
                user: { connect: { id: Number(userId) } }
            }
        });
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export async function getTransactions(req: Request, res: Response) {
    try {
        const transactions = await prisma.transaction.findMany({ include: { user: true } });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export async function updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const { description, value, date, category, type } = req.body;

    if (!description || !value || !date || !category || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const transaction = await prisma.transaction.update({
            where: { id: Number(id) },
            data: { description, value: parseFloat(value), date: new Date(date), category, type }
        });
        res.json(transaction);
    } catch (error) {
        res.status(404).json({ message: 'Transaction not found' });
    }
}

export async function deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;
    try {
        await prisma.transaction.delete({ where: { id: Number(id) } });
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(404).json({ message: 'Transaction not found' });
    }
}
