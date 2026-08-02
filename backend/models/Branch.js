import mongoose from 'mongoose';

const pastorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pastor name is required'],
      trim: true,
    },
    contact: {
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
  },
  { _id: false }
);

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Branch name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Branch location is required'],
      trim: true,
    },
    services: {
      type: String,
      default: 'Saturday: 9:00 AM – 1:30 PM',
      trim: true,
    },
    isPosted: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      trim: true,
    },
    imgPublicId: {
      type: String,
      select: false,
    },
    pastors: [pastorSchema],
  },
  {
    timestamps: true,
  }
);

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
