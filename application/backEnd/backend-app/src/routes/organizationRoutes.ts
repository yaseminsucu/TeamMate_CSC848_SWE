import { Router } from 'express';
import { createOrganization, getAllOrganizations, getUserOrganizations } from '../controllers/organizationOperationsController';

const router = Router();

router.post('/create', createOrganization);
router.get('/allOrgs', getAllOrganizations);
router.get('/userOrgs', getUserOrganizations); 

export default router;