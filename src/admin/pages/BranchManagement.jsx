import { useState, useEffect, useCallback } from 'react';
import { branchService } from '../services/branchService';
import { useNotification } from '../context/NotificationContext';
import BranchFormModal from '../components/branches/BranchFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import BranchCard from '../../components/BranchCard';
import BranchCardSkeleton from '../../components/skeletons/BranchCardSkeleton';
import Pagination from '../../components/Pagination';
import { FadeIn } from '../../components/skeletons/Skeleton';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const PAGE_SIZE = 6;

export default function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBranches, setTotalBranches] = useState(0);

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm delete dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingBranch, setDeletingBranch] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showSuccess, showError } = useNotification();

  const fetchBranches = useCallback(
    async (page = 1, query = searchQuery) => {
      setLoading(true);
      try {
        const res = await branchService.getAllBranches({
          page,
          limit: PAGE_SIZE,
          search: query,
        });
        setBranches(res.branches || []);
        setTotalPages(res.totalPages || 1);
        setTotalBranches(res.total || 0);
      } catch (err) {
        showError(err.message || 'Failed to load branches.');
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, showError]
  );

  useEffect(() => {
    fetchBranches(currentPage, searchQuery);
  }, [currentPage, searchQuery, fetchBranches]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Open Add modal
  const handleOpenAdd = () => {
    setEditingBranch(null);
    setIsFormOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (branch) => {
    setEditingBranch(branch);
    setIsFormOpen(true);
  };

  // Open Delete Confirm modal
  const handleOpenDelete = (branch) => {
    setDeletingBranch(branch);
    setIsConfirmOpen(true);
  };

  // Handle Post / Publish action directly from card
  const handlePostBranch = async (branch) => {
    try {
      const payload = new FormData();
      payload.append('name', branch.name);
      payload.append('location', branch.location);
      payload.append('services', branch.services || 'Saturday: 9:00 AM – 1:30 PM');
      payload.append('isPosted', 'true');
      if (branch.pastors) {
        payload.append('pastors', JSON.stringify(branch.pastors));
      }

      await branchService.updateBranch(branch._id, payload);
      showSuccess(`Branch "${branch.name}" is now live on the public frontend!`);
      fetchBranches(currentPage, searchQuery);
    } catch (err) {
      showError(err.message || 'Failed to post branch.');
    }
  };

  // Handle Create or Update submission from form modal
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingBranch) {
        await branchService.updateBranch(editingBranch._id, formData);
        showSuccess(`Branch "${formData.get('name')}" updated successfully!`);
      } else {
        await branchService.createBranch(formData);
        showSuccess(`Branch "${formData.get('name')}" posted successfully!`);
      }
      setIsFormOpen(false);
      fetchBranches(currentPage, searchQuery);
    } catch (err) {
      showError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete confirm
  const handleConfirmDelete = async () => {
    if (!deletingBranch) return;
    setIsDeleting(true);
    try {
      await branchService.deleteBranch(deletingBranch._id);
      showSuccess(`Branch "${deletingBranch.name}" was deleted successfully.`);
      setIsConfirmOpen(false);
      fetchBranches(currentPage, searchQuery);
    } catch (err) {
      showError(err.message || 'Failed to delete branch.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Branch Management</h1>
          <p className="admin-page-subtitle">
            Manage church branches, location details, assigned pastors, and live public postings.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <AddIcon fontSize="small" /> Add Branch
        </button>
      </div>

      {/* Toolbar / Search Bar */}
      <div className="admin-toolbar">
        <div className="admin-search-input">
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="Search branches by name or location..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="admin-toolbar-stats">
          Total: <span className="stat-count">{totalBranches}</span> branches
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BranchCardSkeleton key={i} />
          ))}
        </div>
      ) : branches.length === 0 ? (
        <div className="admin-empty-state">
          <LocationOnOutlinedIcon style={{ fontSize: 48, color: '#9ca3af' }} />
          <h3>No branches found</h3>
          <p>
            {searchQuery
              ? 'No branch matches your search criteria. Try a different keyword.'
              : 'Get started by posting your first church branch location.'}
          </p>
          {!searchQuery && (
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleOpenAdd}
              style={{ marginTop: '1rem' }}
            >
              <AddIcon fontSize="small" /> Add Branch
            </button>
          )}
        </div>
      ) : (
        <>
          <FadeIn>
            <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <BranchCard
                  key={branch._id}
                  branch={branch}
                  isAdmin={true}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                  onPost={handlePostBranch}
                />
              ))}
            </div>
          </FadeIn>

          {/* Server-Side Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalBranches}
            pageSize={PAGE_SIZE}
          />
        </>
      )}

      {/* Form Modal for Create & Edit */}
      <BranchFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingBranch}
        isLoading={isSubmitting}
      />

      {/* Confirmation Dialog for Destructive Delete */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Branch"
        message={`Are you sure you want to delete "${deletingBranch?.name}"? This action is permanent and cannot be undone.`}
        confirmText="Delete Branch"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
