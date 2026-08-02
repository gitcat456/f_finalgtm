import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { PerfTimer } from '../utils/performanceLogger.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new ApiError(400, 'Please provide username and password'));
    }

    // Find user (username is lowercase in DB)
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return next(new ApiError(401, 'Invalid username or password'));
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new ApiError(401, 'Invalid username or password'));
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET || 'supersecretjwtkeyforgtm2026',
      { expiresIn: '1h' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 60 * 60 * 1000 // 1 hour
    });

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  const timer = new PerfTimer('/api/auth/me');
  try {
    const cStart = process.hrtime.bigint();
    // req.user was already fetched in protect middleware — zero redundant DB call
    const user = req.user;
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }
    const cEnd = process.hrtime.bigint();
    timer.recordController(Number(cEnd - cStart) / 1e6);

    return timer.sendJsonResponse(
      res,
      200,
      {
        status: 'success',
        user: {
          id: user.id || user._id,
          username: user.username,
          role: user.role,
        },
      },
      req.method
    );
  } catch (error) {
    next(error);
  }
};
