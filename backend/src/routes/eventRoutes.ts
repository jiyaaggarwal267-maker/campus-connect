import express from 'express';

import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController';

import {
  protect,
  admin
} from '../middleware/authMiddleware';

import upload from '../middleware/upload';


const router = express.Router();



// Get all events
// Create event (Admin + Image Upload)

router.route('/')
  .get(getEvents)
  .post(
    protect,
    admin,
    upload.single('banner'),
    createEvent
  );




// Get single event
// Update event
// Delete event

router.route('/:id')
  .get(getEventById)
  .put(
    protect,
    admin,
    upload.single('banner'),
    updateEvent
  )
  .delete(
    protect,
    admin,
    deleteEvent
  );



export default router;
