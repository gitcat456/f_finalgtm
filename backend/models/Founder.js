import mongoose from 'mongoose';

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Founder name is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: 'Founder',
    },
    bio: {
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
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Founder = mongoose.model('Founder', founderSchema);

export default Founder;
