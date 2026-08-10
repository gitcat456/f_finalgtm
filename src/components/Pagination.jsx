import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  pageSize = 6,
}) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page number sequence with ellipsis for clean display
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
      {/* Item count text */}
      <div className="text-xs text-gray-500 font-medium">
        Showing <span className="font-semibold text-gray-900">{totalItems > 0 ? startItem : 0}</span> to{' '}
        <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalItems}</span> branches
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${currentPage === 1
              ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 active:scale-95 shadow-xs'
            }`}
        >
          <ChevronLeftIcon fontSize="small" /> Previous
        </button>

        {/* Numeric Page Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            page === '...' ? (
              <span key={`dots-${idx}`} className="px-2 text-xs text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-lg border transition-all ${currentPage === page
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300'
                  }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Page indicator for mobile */}
        <span className="sm:hidden text-xs text-gray-600 font-medium px-2">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${currentPage === totalPages
              ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 active:scale-95 shadow-xs'
            }`}
        >
          Next <ChevronRightIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
