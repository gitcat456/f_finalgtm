/**
 * cloudinary.js
 *
 * Reusable Cloudinary URL optimization utility.
 *
 * Usage:
 *   import { getOptimizedImageUrl } from '../utils/cloudinary';
 *   const src = getOptimizedImageUrl(url, 800);
 *
 * Recommended widths:
 *   Hero / background images : 1920
 *   Branch cover images      : 600
 *   Event cards / posters    : 800
 *   Pastor / profile images  : 300
 *   Logos                    : 300
 */

/**
 * Matches the base portion of a Cloudinary upload URL up to and including /upload/
 * then captures everything after it (which may or may not include existing transforms).
 */
const CLOUDINARY_BASE_RE = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)/;

/**
 * Detects the version segment (e.g. v1785149468/) and everything after it.
 * This is used to strip any existing transformation block.
 */
const VERSION_AND_PATH_RE = /(v\d+\/.+)$/;

/**
 * Inserts Cloudinary fetch/delivery transformations into a Cloudinary URL.
 * Safely strips any existing transformation block before inserting the new one,
 * so transforms are never stacked.
 *
 * @param {string|null|undefined} url  - The original Cloudinary secure_url.
 * @param {number} [width=800]         - Desired maximum width in pixels.
 * @returns {string} Optimized URL, or the original value if it is not a
 *                   recognised Cloudinary upload URL.
 */
export function getOptimizedImageUrl(url, width = 800) {
  // Guard: return as-is for falsy or non-string values
  if (!url || typeof url !== 'string') return url;

  // Must be a Cloudinary upload URL
  const baseMatch = url.match(CLOUDINARY_BASE_RE);
  if (!baseMatch) return url;

  const base = baseMatch[1]; // e.g. "https://res.cloudinary.com/dyy3aepmu/image/upload/"

  // Extract the version-and-path segment (strips any transforms that precede it)
  const afterUpload = url.slice(base.length); // everything after "/upload/"
  const versionMatch = afterUpload.match(VERSION_AND_PATH_RE);
  if (!versionMatch) return url;

  const versionAndPath = versionMatch[1]; // e.g. "v1785149468/home_ciuqs7.jpg"

  return `${base}f_auto,q_auto,c_limit,w_${width}/${versionAndPath}`;
}
