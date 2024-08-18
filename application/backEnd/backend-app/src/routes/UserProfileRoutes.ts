import { Router } from 'express';
import { generateUserProfile, getUserID } from '../controllers/userProfileController';
const router = Router();

router.post('/generate', generateUserProfile);
router.get('/userID', getUserID);
export default router;