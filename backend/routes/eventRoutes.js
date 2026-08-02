import express from 'express';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadEventImage } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes (C/U/D)
router.post('/', protect, uploadEventImage, createEvent);
router.put('/:id', protect, uploadEventImage, updateEvent);
router.patch('/:id', protect, uploadEventImage, updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
