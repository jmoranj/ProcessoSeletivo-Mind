import { Router } from 'express';
import { registerUser, loginUser, validateJwt, logoutUser, refreshToken } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/validate-jwt', validateJwt)
userRoutes.get('/logout', logoutUser)
userRoutes.get('/refresh-token', refreshToken)

export default userRoutes;
