import express  from "express";
import { getUsers,
     getUserById, 
     createUser,
     getUserByName,
     updateUser,
     deleteUser
} from '../controllers/UserController.js';

const router = express.Router();

import { auth } from '../middlewares/auth.js';

router.get('/api/users', getUsers);
router.get('/api/users/:id', getUserById);
router.post('/api/user', auth, getUserByName);
router.post('/api/users', createUser);
router.patch('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);


export default router;