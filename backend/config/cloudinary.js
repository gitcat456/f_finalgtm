import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

/**
 * Clean environment variables to strip accidental quotes and whitespace.
 */
const sanitize = (val) => (val ? String(val).trim().replace(/^["']|["']$/g, '') : '');

const cloud_name = sanitize(process.env.CLOUDINARY_CLOUD_NAME);
const api_key = sanitize(process.env.CLOUDINARY_API_KEY);
const api_secret = sanitize(process.env.CLOUDINARY_API_SECRET);
const cloudinary_url = sanitize(process.env.CLOUDINARY_URL);

if (cloudinary_url) {
  cloudinary.config({
    cloudinary_url,
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
}

export default cloudinary;
