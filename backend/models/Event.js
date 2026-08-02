import mongoose from 'mongoose';

const eventTimesSchema = new mongoose.Schema(
  {
    sabbath: {
      type: String,
      trim: true,
    },
    otherDays: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['past', 'ongoing', 'upcoming'],
      default: 'upcoming',
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    scripture: {
      type: String,
      trim: true,
    },
    dateRange: {
      type: String,
      required: [true, 'Event date range is required'],
      trim: true,
    },
    times: {
      type: eventTimesSchema,
      default: {},
    },
    note: {
      type: String,
      trim: true,
    },
    monthYear: {
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    vision: {
      type: String,
      trim: true,
    },
    mission: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    imagePublicId: {
      type: String,
      select: false,
    },
    isPosted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
