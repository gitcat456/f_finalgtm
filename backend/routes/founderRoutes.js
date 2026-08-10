import express from 'express';
import {
  getAllFounders,
  getFounderById,
  createFounder,
  updateFounder,
  deleteFounder,
} from '../controllers/founderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadFounderImage } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllFounders);
router.get('/:id', getFounderById);

// Protected routes (C/U/D)
router.post('/', protect, uploadFounderImage, createFounder);
router.put('/:id', protect, uploadFounderImage, updateFounder);
router.patch('/:id', protect, uploadFounderImage, updateFounder);
router.delete('/:id', protect, deleteFounder);

export default router;
