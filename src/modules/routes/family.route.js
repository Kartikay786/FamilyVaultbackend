import express from 'express'
import { upload } from '../../middleware/multer.middleware.js';
import { familyProfile, loginFamily, regsiterFamily } from '../controllers/family.controller.js';
const router = express.Router();

router.post('/registerfamily',
    upload.fields([
        { name: "profileImage", maxCount: 1 }
    ]), regsiterFamily);    
router.post('/loginfamily',loginFamily);
router.get('/familyProfile/:familyId',familyProfile)

export default router