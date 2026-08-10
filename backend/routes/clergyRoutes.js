import express from 'express';
import {
  getAllClergy,
  getClergyById,
  createClergy,
  updateClergy,
  deleteClergy,
} from '../controllers/clergyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadClergyImage } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllClergy);
router.get('/:id', getClergyById);

// Protected routes (C/U/D)
router.post('/', protect, uploadClergyImage, createClergy);
router.put('/:id', protect, uploadClergyImage, updateClergy);
router.patch('/:id', protect, uploadClergyImage, updateClergy);
router.delete('/:id', protect, deleteClergy);

export default router;
