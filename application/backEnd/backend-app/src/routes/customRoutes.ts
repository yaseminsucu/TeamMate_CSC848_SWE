import { Router } from 'express';
import { createCustomSection, getAllcustomSection, getCustomSection} from "../controllers/customController";

const router = Router();
router.post('/createCustomSection', createCustomSection);
router.get('/getAllCustomSections', getAllcustomSection);
router.post('/getCustomSection', getCustomSection);

export default router;