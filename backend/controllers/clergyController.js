import Clergy from '../models/Clergy.js';
import ApiError from '../utils/ApiError.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  FOLDERS,
} from '../services/cloudinaryService.js';
import { PerfTimer } from '../utils/performanceLogger.js';

// @desc    Get all clergy members
// @route   GET /api/clergy
// @access  Public
export const getAllClergy = async (req, res, next) => {
  const timer = new PerfTimer('/api/clergy');
  try {
    const clergy = await timer.measureDb(() =>
      Clergy.find().sort({ order: 1, createdAt: 1 }).lean()
    );

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        results: clergy.length,
        data: {
          clergy,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single clergy member by ID
// @route   GET /api/clergy/:id
// @access  Public
export const getClergyById = async (req, res, next) => {
  const timer = new PerfTimer(`/api/clergy/${req.params.id}`);
  try {
    const clergyMember = await timer.measureDb(() =>
      Clergy.findById(req.params.id).lean()
    );
    if (!clergyMember) {
      return next(new ApiError(404, 'Clergy member not found'));
    }

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          clergyMember,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create new clergy member
// @route   POST /api/clergy
// @access  Private (Protected)
export const createClergy = async (req, res, next) => {
  const timer = new PerfTimer('/api/clergy');
  try {
    if (req.file) {
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.CLERGY)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    const clergyMember = await timer.measureDb(() => Clergy.create(req.body));

    return timer.sendJsonResponse(
      res,
      201,
      {
        status: 'success',
        data: {
          clergyMember,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update clergy member
// @route   PUT /api/clergy/:id
// @access  Private (Protected)
export const updateClergy = async (req, res, next) => {
  const timer = new PerfTimer(`/api/clergy/${req.params.id}`);
  try {
    const existingClergy = await timer.measureDb(() =>
      Clergy.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!existingClergy) {
      return next(new ApiError(404, 'Clergy member not found'));
    }

    if (req.file) {
      if (existingClergy.imagePublicId) {
        await timer.measureCloudinary(() =>
          deleteFromCloudinary(existingClergy.imagePublicId)
        );
      }
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.CLERGY)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    const clergyMember = await timer.measureDb(() =>
      Clergy.findByIdAndUpdate(req.params.id, req.body, {
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
          clergyMember,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete clergy member
// @route   DELETE /api/clergy/:id
// @access  Private (Protected)
export const deleteClergy = async (req, res, next) => {
  const timer = new PerfTimer(`/api/clergy/${req.params.id}`);
  try {
    const clergyMember = await timer.measureDb(() =>
      Clergy.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!clergyMember) {
      return next(new ApiError(404, 'Clergy member not found'));
    }

    if (clergyMember.imagePublicId) {
      await timer.measureCloudinary(() =>
        deleteFromCloudinary(clergyMember.imagePublicId)
      );
    }

    await timer.measureDb(() => Clergy.findByIdAndDelete(req.params.id));

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        message: 'Clergy member deleted successfully',
        data: null,
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
