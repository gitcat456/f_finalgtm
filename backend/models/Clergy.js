import mongoose from 'mongoose';

const clergySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Clergy member name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Clergy member title/role is required'],
      trim: true,
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

const Clergy = mongoose.model('Clergy', clergySchema);

export default Clergy;
