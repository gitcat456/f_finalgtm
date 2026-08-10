import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { branches as staticBranches } from '../data/branchesData';
import { branchService } from '../admin/services/branchService';
import BranchCard from '../components/BranchCard';
import BranchCardSkeleton from '../components/skeletons/BranchCardSkeleton';
import Pagination from '../components/Pagination';
import { FadeIn } from '../components/skeletons/Skeleton';
import { getOptimizedImageUrl } from '../utils/cloudinary';

// Hero background — width 1920 (hero/background)
const HERO_BG_URL = getOptimizedImageUrl(
  'https://res.cloudinary.com/dyy3aepmu/image/upload/v1785607208/children_jghb1y.jpg',
  1920
);

const PAGE_SIZE = 6;

const BranchesPage = () => {
  const [branchesList, setBranchesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBranches, setTotalBranches] = useState(0);

  const fetchBranches = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await branchService.getAllBranches({
        page,
        limit: PAGE_SIZE,
        isPosted: true,
      });

      if (res.branches && res.branches.length > 0) {
        setBranchesList(res.branches);
        setTotalPages(res.totalPages || 1);
        setTotalBranches(res.total || res.branches.length);
      } else {
        // Fall back to static data if DB is empty
        const startIndex = (page - 1) * PAGE_SIZE;
        const sliced = staticBranches.slice(startIndex, startIndex + PAGE_SIZE);
        setBranchesList(sliced);
        setTotalPages(Math.ceil(staticBranches.length / PAGE_SIZE));
        setTotalBranches(staticBranches.length);
      }
    } catch {
      // Fall back to static data if backend is offline
      const startIndex = (page - 1) * PAGE_SIZE;
      const sliced = staticBranches.slice(startIndex, startIndex + PAGE_SIZE);
      setBranchesList(sliced);
      setTotalPages(Math.ceil(staticBranches.length / PAGE_SIZE));
      setTotalBranches(staticBranches.length);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches(currentPage);
  }, [currentPage, fetchBranches]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8">
      {/* Hero Section */}
      <div className="relative py-20 md:py-24 overflow-hidden rounded-b-3xl mb-12 shadow-sm">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 opacity-95"></div>
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
            style={{ backgroundImage: `url(${HERO_BG_URL})` }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Our Church Branches
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto font-light leading-relaxed">
                Find a Grace and Truth Ministries location near you and join our community
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Branches Content */}
      <div className="content-container pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 tracking-tight">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We have multiple branches across the country. Find one near you and join our worship community.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BranchCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {branchesList.map((branch, index) => (
                    <motion.div
                      key={branch._id || branch.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Public view — no admin props passed */}
                      <BranchCard branch={branch} isAdmin={false} />
                    </motion.div>
                  ))}
                </div>
              </FadeIn>

              {/* Server-Side Pagination Controls (Max 6 per page) */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalBranches}
                pageSize={PAGE_SIZE}
              />
            </>
          )}

          <div className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 text-center border border-primary-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>

            <h3 className="text-2xl font-bold text-primary-900 mb-4 tracking-tight relative z-10">
              Can&apos;t Find a Branch Near You?
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto mb-2 relative z-10 leading-relaxed">
              We&apos;re constantly expanding our community. If you don&apos;t see a branch in your area, let us know and we&apos;ll help you connect with fellow believers nearby.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BranchesPage;