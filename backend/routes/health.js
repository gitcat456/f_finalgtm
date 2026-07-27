import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend API health check clean and operational',
    timestamp: new Date().toISOString()
  });
});

export default router;
