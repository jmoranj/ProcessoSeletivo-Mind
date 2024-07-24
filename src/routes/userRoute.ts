import { Router } from 'express';
import { registerUser, loginUser, validateJwt } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/validate-jwt', validateJwt)

export default userRoutes;
