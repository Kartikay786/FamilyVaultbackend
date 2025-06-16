import express from 'express'
import { upload } from '../../middleware/multer.middleware.js';
import { addMemory, memoryById } from '../controllers/memory.controller.js';
const router = express.Router();

router.post('/uploadMemory',upload.fields([{name:'profileImage',maxCount:1},{name:'video',maxCount:1}]),addMemory);
router.get('/memory/:memoryId',memoryById)

export default router