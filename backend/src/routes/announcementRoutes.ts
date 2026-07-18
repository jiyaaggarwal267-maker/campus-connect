import express from 'express';
import { getAnnouncements } from '../controllers/announcementController';

const router = express.Router();

router.route('/')
  .get(getAnnouncements);

export default router;
