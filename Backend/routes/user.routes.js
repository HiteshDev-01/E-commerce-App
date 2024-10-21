import express from 'express';
import { login, registerUser, loginAdmin } from '../controllers/user.controller.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login',login);
userRouter.post('/adminLogin',loginAdmin);

export default userRouter;