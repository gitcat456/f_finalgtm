import Branch from '../models/Branch.js';
import ApiError from '../utils/ApiError.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  FOLDERS,
} from '../services/cloudinaryService.js';
import { PerfTimer } from '../utils/performanceLogger.js';

// @desc    Get all branches
// @route   GET /api/branches
// @access  Public
export const getAllBranches = async (req, res, next) => {
  const timer = new PerfTimer('/api/branches');
  try {
    const branches = await timer.measureDb(() =>
      Branch.find().sort({ createdAt: -1 }).lean()
    );

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        results: branches.length,
        data: {
          branches,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single branch by ID
// @route   GET /api/branches/:id
// @access  Public
export const getBranchById = async (req, res, next) => {
  const timer = new PerfTimer(`/api/branches/${req.params.id}`);
  try {
    const branch = await timer.measureDb(() =>
      Branch.findById(req.params.id).lean()
    );
    if (!branch) {
      return next(new ApiError(404, 'Branch not found'));
    }

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          branch,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create new branch
// @route   POST /api/branches
// @access  Private (Protected)
export const createBranch = async (req, res, next) => {
  const timer = new PerfTimer('/api/branches');
  try {
    // Upload branch image if provided
    if (req.files && req.files.img && req.files.img[0]) {
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.files.img[0].buffer, FOLDERS.BRANCHES)
      );
      req.body.img = result.secure_url;
      req.body.imgPublicId = result.public_id;
    }

    if (!req.body.services) {
      req.body.services = 'Saturday: 9:00 AM – 1:30 PM';
    }
    if (typeof req.body.isPosted === 'string') {
      req.body.isPosted = req.body.isPosted === 'true';
    }

    // Parse pastors from JSON string if sent as form-data
    if (typeof req.body.pastors === 'string') {
      req.body.pastors = JSON.parse(req.body.pastors);
    }

    // Upload pastor images if provided
    if (req.files && req.files.pastorImages && Array.isArray(req.body.pastors)) {
      const pastorIndices = req.body.pastorImageIndices
        ? (typeof req.body.pastorImageIndices === 'string' ? JSON.parse(req.body.pastorImageIndices) : req.body.pastorImageIndices)
        : null;

      for (let i = 0; i < req.files.pastorImages.length; i++) {
        const targetIdx = pastorIndices ? pastorIndices[i] : i;
        if (targetIdx !== undefined && req.body.pastors[targetIdx]) {
          const result = await timer.measureCloudinary(() =>
            uploadToCloudinary(req.files.pastorImages[i].buffer, FOLDERS.CLERGY)
          );
          req.body.pastors[targetIdx].image = result.secure_url;
          req.body.pastors[targetIdx].imagePublicId = result.public_id;
        }
      }
    }

    const branch = await timer.measureDb(() => Branch.create(req.body));

    return timer.sendJsonResponse(
      res,
      201,
      {
        status: 'success',
        data: {
          branch,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update branch
// @route   PUT /api/branches/:id
// @access  Private (Protected)
export const updateBranch = async (req, res, next) => {
  const timer = new PerfTimer(`/api/branches/${req.params.id}`);
  try {
    // Fetch existing branch with public IDs for cleanup
    const existingBranch = await timer.measureDb(() =>
      Branch.findById(req.params.id).select(
        '+imgPublicId +pastors.imagePublicId'
      ).lean()
    );
    if (!existingBranch) {
      return next(new ApiError(404, 'Branch not found'));
    }

    // Upload new branch image if provided, clean up old one
    if (req.files && req.files.img && req.files.img[0]) {
      if (existingBranch.imgPublicId) {
        await timer.measureCloudinary(() =>
          deleteFromCloudinary(existingBranch.imgPublicId)
        );
      }
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.files.img[0].buffer, FOLDERS.BRANCHES)
      );
      req.body.img = result.secure_url;
      req.body.imgPublicId = result.public_id;
    }

    if (!req.body.services) {
      req.body.services = 'Saturday: 9:00 AM – 1:30 PM';
    }
    if (typeof req.body.isPosted === 'string') {
      req.body.isPosted = req.body.isPosted === 'true';
    }

    // Parse pastors from JSON string if sent as form-data
    if (typeof req.body.pastors === 'string') {
      req.body.pastors = JSON.parse(req.body.pastors);
    }

    // Upload new pastor images if provided, clean up old ones
    if (req.files && req.files.pastorImages && Array.isArray(req.body.pastors)) {
      const pastorIndices = req.body.pastorImageIndices
        ? (typeof req.body.pastorImageIndices === 'string' ? JSON.parse(req.body.pastorImageIndices) : req.body.pastorImageIndices)
        : null;

      for (let i = 0; i < req.files.pastorImages.length; i++) {
        const targetIdx = pastorIndices ? pastorIndices[i] : i;
        if (targetIdx !== undefined && req.body.pastors[targetIdx]) {
          // Clean up old pastor image if it exists
          if (
            existingBranch.pastors &&
            existingBranch.pastors[targetIdx] &&
            existingBranch.pastors[targetIdx].imagePublicId
          ) {
            await timer.measureCloudinary(() =>
              deleteFromCloudinary(existingBranch.pastors[targetIdx].imagePublicId)
            );
          }
          const result = await timer.measureCloudinary(() =>
            uploadToCloudinary(req.files.pastorImages[i].buffer, FOLDERS.CLERGY)
          );
          req.body.pastors[targetIdx].image = result.secure_url;
          req.body.pastors[targetIdx].imagePublicId = result.public_id;
        }
      }
    }

    const branch = await timer.measureDb(() =>
      Branch.findByIdAndUpdate(req.params.id, req.body, {
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
          branch,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete branch
// @route   DELETE /api/branches/:id
// @access  Private (Protected)
export const deleteBranch = async (req, res, next) => {
  const timer = new PerfTimer(`/api/branches/${req.params.id}`);
  try {
    // Fetch with public IDs for Cloudinary cleanup
    const branch = await timer.measureDb(() =>
      Branch.findById(req.params.id).select(
        '+imgPublicId +pastors.imagePublicId'
      ).lean()
    );
    if (!branch) {
      return next(new ApiError(404, 'Branch not found'));
    }

    // Clean up branch image from Cloudinary
    if (branch.imgPublicId) {
      await timer.measureCloudinary(() =>
        deleteFromCloudinary(branch.imgPublicId)
      );
    }

    // Clean up all pastor images from Cloudinary
    if (branch.pastors && branch.pastors.length > 0) {
      for (const pastor of branch.pastors) {
        if (pastor.imagePublicId) {
          await timer.measureCloudinary(() =>
            deleteFromCloudinary(pastor.imagePublicId)
          );
        }
      }
    }

    await timer.measureDb(() => Branch.findByIdAndDelete(req.params.id));

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        message: 'Branch deleted successfully',
        data: null,
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
