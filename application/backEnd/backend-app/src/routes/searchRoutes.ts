import { Router } from 'express';
import { autoCompleteSearch, rankedSearch } from '../controllers/searchController';

const router = Router();

router.post('/auto-complete', autoCompleteSearch);
router.post('/ranked-search', rankedSearch);

export default router;