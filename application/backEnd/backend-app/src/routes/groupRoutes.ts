import { getOrgGroups, createGroup, getGroupDetails} from '../controllers/groupController';
import { Router } from 'express';

const router = Router();

router.post('/create', createGroup);
router.get('/get', getOrgGroups);
router.post('/getGroupDetails', getGroupDetails);

export default router;