import { Router } from 'express'

export const userRoute = Router()

userRoute.get('/users', (req, res) => res.send('API'))