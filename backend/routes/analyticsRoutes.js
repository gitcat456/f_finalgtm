import express from 'express';
import { trackVisit, getAnalyticsStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for tracking visits
router.post('/track', trackVisit);

// Protected admin route for analytics dashboard stats
router.get('/stats', protect, getAnalyticsStats);

export default router;
