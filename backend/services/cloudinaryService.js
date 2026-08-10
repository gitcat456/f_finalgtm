import cloudinary from '../config/cloudinary.js';

/**
 * Cloudinary folder constants matching the GTM folder structure.
 */
export const FOLDERS = {
  BRANCHES: 'gtm/branches_pics',
  EVENTS: 'gtm/event_pics',
  CLERGY: 'gtm/clergy_pics',
  FOUNDERS: 'gtm/founders_pics',
};

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The image file buffer from multer memory storage.
 * @param {string} folder - Target Cloudinary folder (use FOLDERS constants).
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
export const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete an asset from Cloudinary by its public_id.
 * @param {string} publicId - The Cloudinary public_id of the asset.
 * @returns {Promise<object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // Log but don't throw — cleanup failures shouldn't break the main operation
    console.error(`Cloudinary delete failed for ${publicId}:`, error.message);
    return null;
  }
};
