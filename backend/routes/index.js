import express from 'express';
import healthRoutes from './health.js';
import authRoutes from './authRoutes.js';
import branchRoutes from './branchRoutes.js';
import eventRoutes from './eventRoutes.js';

const router = express.Router();

// API root welcome endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GTM API operational',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      branches: '/api/branches',
      events: '/api/events'
    }
  });
});

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/branches', branchRoutes);
router.use('/events', eventRoutes);

export default router;

