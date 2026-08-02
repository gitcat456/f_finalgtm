import React from 'react';
import { Call as PhoneIcon } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DEFAULT_SERVICE_SCHEDULE } from '../constants/branchConstants';
import { getPastorImage } from '../data/pastorData';
import { getOptimizedImageUrl } from '../utils/cloudinary';

/**
 * Reusable BranchCard component preserving original frontend card design.
 */
export default function BranchCard({
  branch,
  isAdmin = false,
  onEdit,
  onDelete,
  onPost,
}) {
  const isPosted = branch.isPosted !== false;

  return (
    <div className="card overflow-hidden flex flex-col h-full group relative bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300">
      {/* Admin Destructive Action - Top Right Delete Icon */}
      {isAdmin && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(branch)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-sm"
          title="Delete Branch"
          aria-label="Delete Branch"
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
        </button>
      )}

      {/* Banner Image Area */}
      <div className="relative h-56 overflow-hidden bg-gray-900">
        {branch.img ? (
          <img
            src={getOptimizedImageUrl(branch.img, 600)}
            alt={branch.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500 font-medium text-sm">
            No Cover Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {branch.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Location Row */}
        <div className="flex items-start mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Location"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-gray-700 font-medium leading-normal">
            {branch.location}
          </p>
        </div>

        {/* Service Schedule Row (Constant) */}
        <div className="flex items-start mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Service Times"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-sm font-medium">
            {DEFAULT_SERVICE_SCHEDULE}
          </p>
        </div>

        {/* Leadership / Pastors Section */}
        <div className="border-t border-gray-100 pt-5 mt-auto">
          <h4 className="font-bold text-gray-900 mb-4 tracking-wide uppercase text-xs text-primary-600">
            Leadership
          </h4>
          <div className="space-y-4">
            {branch.pastors && branch.pastors.length > 0 ? (
              branch.pastors.map((p, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 shadow-sm border border-gray-200 flex-shrink-0 bg-gray-100">
                    <img
                      src={getOptimizedImageUrl(p.image || getPastorImage(p.name), 300)}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      {p.name}
                    </p>
                    {p.contact && (
                      <div className="flex items-center mt-0.5">
                        <PhoneIcon
                          sx={{ color: '#6b7280', fontSize: '14px', mr: 0.5 }}
                        />
                        <a
                          href={`tel:${p.contact}`}
                          className="text-gray-600 text-sm hover:text-primary-600 transition-colors font-mono"
                        >
                          {p.contact}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">
                Leadership information not available
              </p>
            )}
          </div>
        </div>

        {/* View Location Button (Requirement 8) */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            branch.location
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full btn-outline text-center block font-semibold py-2.5 px-4 rounded-xl border-[2px] border-primary-600 text-primary-600 hover:text-primary-700 hover:border-primary-700 hover:bg-gray-50 transition-colors"
        >
          View on Map
        </a>

        {/* Admin Actions Footer (Edit on Left, Post on Right) */}
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            {/* Edit Action on Left */}
            <button
              type="button"
              onClick={() => onEdit?.(branch)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} /> Edit
            </button>

            {/* Post Action on Right */}
            {onPost ? (
              <button
                type="button"
                onClick={() => onPost(branch)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${isPosted
                    ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                    : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm'
                  }`}
              >
                {isPosted ? (
                  <>
                    <CheckCircleIcon sx={{ fontSize: 16 }} /> Posted
                  </>
                ) : (
                  <>
                    <SendIcon sx={{ fontSize: 15 }} /> Post Now
                  </>
                )}
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircleIcon sx={{ fontSize: 14 }} /> Posted
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
