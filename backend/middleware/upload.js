import multer from 'multer';
import ApiError from '../utils/ApiError.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type: ${file.mimetype}. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
});

/**
 * Branch uploads: one branch image ('img') + multiple pastor images ('pastorImages').
 * The pastorImages array is index-matched to the pastors array in req.body.
 */
export const uploadBranchImage = upload.fields([
  { name: 'img', maxCount: 1 },
  { name: 'pastorImages', maxCount: 10 },
]);

/**
 * Event uploads: one event poster image ('image').
 */
export const uploadEventImage = upload.single('image');

/**
 * Founder uploads: single founder image ('image').
 */
export const uploadFounderImage = upload.single('image');

/**
 * Clergy uploads: single clergy member image ('image').
 */
export const uploadClergyImage = upload.single('image');
