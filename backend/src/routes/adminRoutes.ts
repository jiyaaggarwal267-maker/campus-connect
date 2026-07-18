import express from 'express';
import {
  getDashboardStats,
  getAllRegistrations,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/adminController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// All routes here are protected and admin only
router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/registrations', getAllRegistrations);

router.route('/announcement')
  .post(createAnnouncement);

router.route('/announcement/:id')
  .put(updateAnnouncement)
  .delete(deleteAnnouncement);

export default router;
