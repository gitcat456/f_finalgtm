import Event from '../models/Event.js';
import ApiError from '../utils/ApiError.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  FOLDERS,
} from '../services/cloudinaryService.js';
import { PerfTimer } from '../utils/performanceLogger.js';

// @desc    Get all events (optional ?status= filter)
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res, next) => {
  const timer = new PerfTimer('/api/events');
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    // Allow filtering to posted-only events (for public frontend)
    if (req.query.posted === 'true') {
      filter.isPosted = true;
    }

    const events = await timer.measureDb(() =>
      Event.find(filter).sort({ createdAt: -1 }).lean()
    );

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        results: events.length,
        data: {
          events,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
  const timer = new PerfTimer(`/api/events/${req.params.id}`);
  try {
    const event = await timer.measureDb(() =>
      Event.findById(req.params.id).lean()
    );
    if (!event) {
      return next(new ApiError(404, 'Event not found'));
    }

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        data: {
          event,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Protected)
export const createEvent = async (req, res, next) => {
  const timer = new PerfTimer('/api/events');
  try {
    // Upload event image if provided
    if (req.file) {
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.EVENTS)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    if (typeof req.body.times === 'string') {
      try {
        req.body.times = JSON.parse(req.body.times);
      } catch {
        // keep as is if parse fails
      }
    }

    // Parse isPosted from string 'true'/'false' (multipart form data sends strings)
    if (typeof req.body.isPosted === 'string') {
      req.body.isPosted = req.body.isPosted === 'true';
    }

    const event = await timer.measureDb(() => Event.create(req.body));

    return timer.sendJsonResponse(
      res,
      201,
      {
        status: 'success',
        data: {
          event,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Protected)
export const updateEvent = async (req, res, next) => {
  const timer = new PerfTimer(`/api/events/${req.params.id}`);
  try {
    // Fetch existing event with public ID for cleanup
    const existingEvent = await timer.measureDb(() =>
      Event.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!existingEvent) {
      return next(new ApiError(404, 'Event not found'));
    }

    // Upload new image if provided, clean up old one
    if (req.file) {
      if (existingEvent.imagePublicId) {
        await timer.measureCloudinary(() =>
          deleteFromCloudinary(existingEvent.imagePublicId)
        );
      }
      const result = await timer.measureCloudinary(() =>
        uploadToCloudinary(req.file.buffer, FOLDERS.EVENTS)
      );
      req.body.image = result.secure_url;
      req.body.imagePublicId = result.public_id;
    }

    if (typeof req.body.times === 'string') {
      try {
        req.body.times = JSON.parse(req.body.times);
      } catch {
        // keep as is if parse fails
      }
    }

    // Parse isPosted from string 'true'/'false'
    if (typeof req.body.isPosted === 'string') {
      req.body.isPosted = req.body.isPosted === 'true';
    }

    const event = await timer.measureDb(() =>
      Event.findByIdAndUpdate(req.params.id, req.body, {
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
          event,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Protected)
export const deleteEvent = async (req, res, next) => {
  const timer = new PerfTimer(`/api/events/${req.params.id}`);
  try {
    // Fetch with public ID for Cloudinary cleanup
    const event = await timer.measureDb(() =>
      Event.findById(req.params.id).select('+imagePublicId').lean()
    );
    if (!event) {
      return next(new ApiError(404, 'Event not found'));
    }

    // Clean up image from Cloudinary
    if (event.imagePublicId) {
      await timer.measureCloudinary(() =>
        deleteFromCloudinary(event.imagePublicId)
      );
    }

    await timer.measureDb(() => Event.findByIdAndDelete(req.params.id));

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        message: 'Event deleted successfully',
        data: null,
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
