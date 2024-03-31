import express  from "express";

import { getUserProducts,
    createUserProduct, 
    updateUserProduct,
    deleteUserProduct,
    getUserGetProducts
} from '../controllers/UserProductController.js';

const router = express.Router();

import { auth } from '../middlewares/auth.js';

router.get('/api/userproducts', auth, getUserProducts);
router.post('/api/userproducts', auth, createUserProduct);
router.patch('/api/userproducts/:id', auth, updateUserProduct);
router.delete('/api/userproducts/:id', auth, deleteUserProduct);
router.post('/api/getusergetproducts', auth, getUserGetProducts);


export default router;