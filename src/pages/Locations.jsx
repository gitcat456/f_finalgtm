import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { branches as staticBranches } from '../data/branchesData';
import { branchService } from '../admin/services/branchService';
import BranchCard from '../components/BranchCard';
import BranchCardSkeleton from '../components/skeletons/BranchCardSkeleton';
import { FadeIn } from '../components/skeletons/Skeleton';
import childrenBg from '../assets/children.jpg';
import { getOptimizedImageUrl } from '../utils/cloudinary';

// Hero background — width 1920 (hero/background)
const HERO_BG_URL = getOptimizedImageUrl(
  'https://res.cloudinary.com/dyy3aepmu/image/upload/v1785607208/children_jghb1y.jpg',
  1920
);

const BranchesPage = () => {
  const [branchesList, setBranchesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublicBranches() {
      setLoading(true);
      try {
        const fetched = await branchService.getAllBranches();
        if (Array.isArray(fetched) && fetched.length > 0) {
          const postedOnly = fetched.filter((b) => b.isPosted !== false);
          setBranchesList(postedOnly.length > 0 ? postedOnly : fetched);
        } else {
          setBranchesList(staticBranches);
        }
      } catch {
        // Fall back to static data if backend is offline
        setBranchesList(staticBranches);
      } finally {
        setLoading(false);
      }
    }
    loadPublicBranches();
  }, []);

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
          <div className="mb-16 text-center">
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