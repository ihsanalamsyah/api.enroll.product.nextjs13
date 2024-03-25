import express  from "express";

import {
     getProductById,
     getUserGetProducts,
     getProducts,
     createProduct,
     updateProduct,
     deleteProduct
} from '../controllers/ProductController.js';

const router = express.Router();

import { auth } from '../middlewares/auth.js';


router.post('/api/getusergetproducts', auth, getUserGetProducts);
router.post('/api/product', auth, getProductById);
router.get('/api/products', auth, getProducts);
router.post('/api/products', auth, createProduct);
router.patch('/api/products/:id', auth, updateProduct);
router.delete('/api/products/:id', auth, deleteProduct);


export default router;