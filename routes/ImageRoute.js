import express  from "express";
import multer from "multer";
import {
    uploadImage,
    getImage
} from '../controllers/ImageController.js';

import { auth } from '../middlewares/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/api/imageupload', auth, upload.single('image'), uploadImage);
router.post('/api/getimage', auth, getImage);

export default router;