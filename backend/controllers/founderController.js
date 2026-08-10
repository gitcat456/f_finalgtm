import Founder from '../models/Founder.js';
import ApiError from '../utils/ApiError.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  FOLDERS,
} from '../services/cloudinaryService.js';
import { PerfTimer } from '../utils/performanceLogger.js';

// @desc    Get all founders
// @route   GET /api/founders
// @access  Public
export const getAllFounders = async (req, res, next) => {
  const timer = new PerfTimer('/api/founders');
  try {
    const founders = await timer.measureDb(() =>
      Founder.find().sort({ order: 1, createdAt: 1 }).lean()
    );

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        results: founders.length,
        data: {
          founders,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single founder by ID
// @route   GET /api/founders/:id
// @access  Public
export const getFounderById = async (req, res, next) => {
  const timer = new PerfTimer(`/api/founders/${req.params.id}`);
  try {
    const founder = await timer.measureDb(() =>
      Founder.findById(req.params.id).lean()
    );
    if (!founder) {
      return next(new ApiError(404, 'Founder not found'));
    }

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          founder,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create new founder
// @route   POST /api/founders
// @access  Private (Protected)
export const createFounder = async (req, res, next) => {
  const timer = new PerfTimer('/api/founders');
  try {
    // Upload image if provided
    if (req.file) {
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.FOUNDERS)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    const founder = await timer.measureDb(() => Founder.create(req.body));

    return timer.sendJsonResponse(
      res,
      201,
      {
        status: 'success',
        data: {
          founder,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update founder
// @route   PUT /api/founders/:id
// @access  Private (Protected)
export const updateFounder = async (req, res, next) => {
  const timer = new PerfTimer(`/api/founders/${req.params.id}`);
  try {
    const existingFounder = await timer.measureDb(() =>
      Founder.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!existingFounder) {
      return next(new ApiError(404, 'Founder not found'));
    }

    if (req.file) {
      if (existingFounder.imagePublicId) {
        await timer.measureCloudinary(() =>
          deleteFromCloudinary(existingFounder.imagePublicId)
        );
      }
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.FOUNDERS)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    const founder = await timer.measureDb(() =>
      Founder.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).lean()
    );

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          founder,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete founder
// @route   DELETE /api/founders/:id
// @access  Private (Protected)
export const deleteFounder = async (req, res, next) => {
  const timer = new PerfTimer(`/api/founders/${req.params.id}`);
  try {
    const founder = await timer.measureDb(() =>
      Founder.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!founder) {
      return next(new ApiError(404, 'Founder not found'));
    }

    if (founder.imagePublicId) {
      await timer.measureCloudinary(() =>
        deleteFromCloudinary(founder.imagePublicId)
      );
    }

    await timer.measureDb(() => Founder.findByIdAndDelete(req.params.id));

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        message: 'Founder deleted successfully',
        data: null,
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
