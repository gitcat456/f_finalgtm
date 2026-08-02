import express from 'express';
import healthRoutes from './health.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

// API root welcome endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GTM API operational',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth'
    }
  });
});

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;
