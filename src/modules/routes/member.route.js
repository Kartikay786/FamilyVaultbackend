import express from 'express'
import { addMember, findMemberByemail } from '../controllers/member.controller.js';
import { upload } from '../../middleware/multer.middleware.js';

const router = express.Router();

router.post('/addmember',upload.fields([{name:'profileImage',maxCount:1}]),addMember);
router.get('/findMemberByEmailandFamilyId/:familyId/:email',findMemberByemail);

export default router