import express from 'express';
import { registerForEvent, cancelRegistration, getMyRegistrations } from '../controllers/registrationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, registerForEvent);
router.delete('/:id', protect, cancelRegistration);
router.get('/my-events', protect, getMyRegistrations);

export default router;
