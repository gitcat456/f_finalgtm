import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index.js';
import healthRoutes from './routes/health.js';
import errorHandler from './middleware/errorHandler.js';
import ApiError from './utils/ApiError.js';

const app = express();

// Set security HTTP headers
app.use(helmet());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // Vite dev server
      "https://gtmchurch.co.ke",         // Production frontend
      "https://www.gtmchurch.co.ke",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Cookie parsing
app.use(cookieParser());

// Server-level root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'GTM Server operational',
    api: '/api'
  });
});

// Server-level health endpoint
app.use('/health', healthRoutes);

// Register API Routes under /api
app.use('/api', apiRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  next(new ApiError(404, 'Not Found'));
});

// Centralized error handler
app.use(errorHandler);

export default app;
