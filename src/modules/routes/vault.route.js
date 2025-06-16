import express from 'express'
import { createVault, getVaultByVaultId, vaultByFamilyId } from '../controllers/vault.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

const router = express.Router();

router.post('/createVault', upload.fields([{name:'profileImage', maxCount:1}]),createVault);
router.get('/getfamilyvaults/:familyId/:memberId',vaultByFamilyId);
router.get('/vaultbyId/:vaultId',getVaultByVaultId)

export default router