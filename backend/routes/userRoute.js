import express from 'express';
import { userRegistration, userLogin, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/registration', userRegistration);
userRouter.post('/login', userLogin);
userRouter.post('/admin', adminLogin);

export default userRouter;