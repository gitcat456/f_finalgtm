import express from 'express';
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from '../controllers/branchController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadBranchImage } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllBranches);
router.get('/:id', getBranchById);

// Protected routes (C/U/D)
router.post('/', protect, uploadBranchImage, createBranch);
router.put('/:id', protect, uploadBranchImage, updateBranch);
router.patch('/:id', protect, uploadBranchImage, updateBranch);
router.delete('/:id', protect, deleteBranch);

export default router;

