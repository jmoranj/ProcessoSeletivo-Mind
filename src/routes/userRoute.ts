import { Router } from 'express';
import { registerUser, loginUser, validateJwt, logoutUser, refreshToken, getUserById } from '../controllers/userController';
import { upload } from '../middlewares/uploadFile';

const userRoutes = Router();

userRoutes.post('/register', upload.single('photo'), registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/validate-jwt', validateJwt)
userRoutes.get('/logout', logoutUser)
userRoutes.get('/refresh-token', refreshToken)
userRoutes.get('/:id', getUserById)

export default userRoutes;
