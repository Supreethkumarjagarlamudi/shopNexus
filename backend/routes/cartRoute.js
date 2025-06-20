import express from 'express';
import {addToCart, editCart, getUserCart} from "../controllers/cartController.js"
import isUser from '../middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/add', isUser, addToCart);
cartRouter.post('/update', isUser, editCart);
cartRouter.post('/userCart', isUser, getUserCart);

export default cartRouter