import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middlewares/auth';
import { JwtPayload } from 'jsonwebtoken';
import { transactionSchema } from '../schemas/transactionSchemas';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function createTransaction(req: Request, res: Response) {
  try {
    const { token } = req as CustomRequest;
    const decoded = token as JwtPayload;
    
    const parsedData = transactionSchema.parse({
      ...req.body,
      value: Number(req.body.value),
      quantity: Number(req.body.quantity)
    });

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/transactions/${req.file.filename}`;
    }

    const transaction = await prisma.transaction.create({
      data: {
        description: parsedData.description,
        value: parsedData.value,
        quantity: parsedData.quantity,
        date: parsedData.date,
        category: parsedData.category,
        imagePath,
        userId: decoded.id
      }
    });

    res.json(transaction);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error(error);
    res.status(400).json({ error: (error as Error).message });
  }
}


export async function updateTransaction(req: Request, res: Response) {
  const { id } = req.params;
  
  try {
    const parsedData = transactionSchema.parse({
      ...req.body,
      value: parseFloat(req.body.value),
      quantity: parseInt(req.body.quantity) 
    });

    if (!req.file) {
      return res.status(400).json({
        error: 'Image is required'
      });
    }

    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        error: 'File must be an image'
      });
    }

    const oldTransaction = await prisma.transaction.findUnique({
      where: { id: Number(id) }
    });
      
    if (oldTransaction?.imagePath) {
      const fullPath = path.join(__dirname, '..', '..', oldTransaction.imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
      
    const imagePath = `/uploads/transactions/${req.file.filename}`;

    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        ...parsedData,
        imagePath
      }
    });
    
    res.json(transaction);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ error: (error as Error).message });
  }
}



export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) }
    });

    if (transaction?.imagePath) {
      fs.unlinkSync(transaction.imagePath);
    }

    await prisma.transaction.delete({ where: { id: Number(id) } });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Transaction not found' });
  }
}



export async function getTransactions(req: Request, res: Response) {
  const { token } = req as CustomRequest;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = token as JwtPayload;
    const userId = decoded.id;

    const transactions = await prisma.transaction.findMany({
      where: { userId: userId }
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
