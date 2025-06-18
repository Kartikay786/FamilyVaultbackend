import express from 'express'
import { upload } from '../../middleware/multer.middleware.js';
import { addMemory, allMemoryByFamilyId, deleteMemory, editMemory, memoryById } from '../controllers/memory.controller.js';
const router = express.Router();

router.post('/uploadMemory',upload.fields([{name:'profileImage',maxCount:1},{name:'video',maxCount:1},{name:'audio',maxCount:1}]),addMemory);
router.get('/memory/:memoryId',memoryById)
router.get('/allfamilymemory/:familId',allMemoryByFamilyId);
router.put('/editMemory/:memoryId',editMemory);
router.delete('/deleteMemory/:familId/:vaultId/:memoryId',deleteMemory)

export default router