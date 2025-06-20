import express from 'express';
import { addProduct, getAllProducts, removeProduct, productInfo } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import isAdmin from '../middlewares/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', isAdmin, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}, {name: 'image3', maxCount: 1}, {name: 'image4', maxCount: 1}]), addProduct);
productRouter.post("/remove", isAdmin, removeProduct);
productRouter.get("/listProducts", getAllProducts); 
productRouter.post("/productInfo", productInfo);

export default productRouter;
