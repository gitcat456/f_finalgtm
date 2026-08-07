import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    isReturning: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      required: true,
      trim: true,
    },
    referrer: {
      type: String,
      default: 'Direct',
      trim: true,
    },
    deviceType: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet'],
      default: 'desktop',
    },
    browser: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    os: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: false,
  }
);

// Compound index for querying statistics by date ranges efficiently
visitSchema.index({ timestamp: -1, visitorId: 1 });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
