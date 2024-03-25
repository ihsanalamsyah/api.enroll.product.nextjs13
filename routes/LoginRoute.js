import express  from "express";
import { checkUser, signIn
} from '../controllers/LoginController.js';

const router = express.Router();

router.post('/api/login', checkUser);
router.post('/api/signin',  signIn);

export default router;