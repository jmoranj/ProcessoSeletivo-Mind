import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';
import { userSchema } from '../schemas';

const prisma = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
    try {
        const userData = userSchema.parse(req.body);

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await prisma.user.create({
            data: { ...userData, password: hashedPassword }
        });
        res.json(user);

    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.errors });
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, 'your_refresh_secret', { expiresIn: "7d" });

    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.json({ token: accessToken });    
}

export async function logoutUser(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
}


export async function refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken){
        return res.status(401).json({ message: 'Refresh token missing' })
    }

    try {
        const decoded = jwt.verify(refreshToken, 'your_refresh_secret')
        const userId = (decoded as any).id;

        const newAcessToken = jwt.sign({ id: userId }, 'your_jwt_secret', {expiresIn: "1h"})
        res.json({ token: newAcessToken });

    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'invalid refresh token' })
    }
}



export async function validateJwt(req: Request, res: Response) {
    const authHeader = req.headers.authorization; 
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Token must be provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret'); 
        res.json({ valid: true, decoded });
    } catch (error) {
        console.error('JWT Validation Error:', error);
        return res.status(401).json({ message: 'Invalid credentials' });
    }
}


