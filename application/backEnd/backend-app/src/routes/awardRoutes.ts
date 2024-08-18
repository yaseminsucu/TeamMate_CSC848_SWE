import { getAllAwardTypes, getAllAwardInstancesForUser, createAwardInstance, createAwardType } from '../controllers/awardController';
import { Router } from 'express';

const router = Router();

router.post('/createAwardInstance', createAwardInstance)
router.post('/createAwardType', createAwardType)
router.get('/getAwardTypes', getAllAwardTypes)
router.get('/getAwardInstancesForUser', getAllAwardInstancesForUser)

export default router;