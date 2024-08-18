import { Router } from 'express';
import { addMemberToOrganization, getMembersFromOrganization, removeMemberFromOrganization } from '../controllers/memberController';

const router = Router();
router.post('/addMember', addMemberToOrganization); 
router.get('/getMembers', getMembersFromOrganization); 
router.delete('/removeMember', removeMemberFromOrganization);

export default router;