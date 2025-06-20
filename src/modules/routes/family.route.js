import express from 'express'
import { upload } from '../../middleware/multer.middleware.js';
import { changePassword, deletefamilyAccount, editFamily, familyProfile, loginFamily, regsiterFamily, stats } from '../controllers/family.controller.js';
const router = express.Router();

router.post('/registerfamily',
    upload.fields([
        { name: "profileImage", maxCount: 1 }
    ]), regsiterFamily);    
router.post('/loginfamily',loginFamily);
router.get('/familyProfile/:familyId',familyProfile);
router.put('/editfamily/:familyId', upload.fields([
        { name: "profileImage", maxCount: 1 }
    ]),editFamily);
router.get('/allstats/:familyId',stats);
router.put('/changePassword',changePassword);
router.delete('/deleteAccount/:familyId',deletefamilyAccount)

export default router