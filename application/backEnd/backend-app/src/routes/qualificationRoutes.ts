import { Router } from "express";
import { createQualification, createQualificationType, deleteQualification, deletequalificationType, getAllQualifications, getAllQualificationTypes} from "../controllers/qualificationController";

const router = Router();
router.post('/createQualification', createQualification);
router.post('/createQualificationType', createQualificationType);
router.post('/deleteQualification', deleteQualification);
router.post('/deleteQualificationType', deletequalificationType);
router.get('/getQualification', getAllQualifications);
router.get('/getQualificationType', getAllQualificationTypes);

export default router;