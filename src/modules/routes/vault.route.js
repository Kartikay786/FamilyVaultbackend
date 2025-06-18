import express from 'express'
import { addMemberToVault, createVault, deleteMemberToVault, deleteVault, editVault, getVaultByVaultId, vaultByFamilyId, vaultByVaultId } from '../controllers/vault.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

const router = express.Router();

router.post('/createVault', upload.fields([{name:'profileImage', maxCount:1}]),createVault);
router.get('/getfamilyvaults/:familyId/:memberId',vaultByFamilyId);
router.get('/vaultbyId/:vaultId',getVaultByVaultId)
router.put('/addMemberToVault',addMemberToVault)

router.get('/vaultByVaultId/:familyId/:vaultId',vaultByVaultId)
router.put('/editVault/:vaultId', upload.fields([{name:'profileImage', maxCount:1}]),editVault);
router.delete('/deleteMemberToVault/:vaultId/:memberId',deleteMemberToVault)
router.delete('/deleteVault/:vaultId/:familyId',deleteVault)

export default router