import { Router } from 'express';
import { createEventReminderMember, createEvent, editEvent, getAllEvents, getEventDetails} from '../controllers/eventController';

const router = Router();
router.post('/createEventReminder', createEventReminderMember);
router.post('/create', createEvent);  
router.post('/edit', editEvent);  
router.post('/getEventDetails', getEventDetails);
router.get('/getAllEvents', getAllEvents);
export default router;