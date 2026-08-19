import { useState, useEffect, useCallback, useMemo } from 'react';
import { founderService } from '../services/founderService';
import { useNotification } from '../context/NotificationContext';
import FounderFormModal from '../components/founders/FounderFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryEduIcon from '@mui/icons-material/HistoryEduOutlined';
import EventCardSkeleton from '../../components/skeletons/EventCardSkeleton';
import { FadeIn } from '../../components/skeletons/Skeleton';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

export default function FounderManagement() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingFounder, setDeletingFounder] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showSuccess, showError } = useNotification();

  const fetchFounders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await founderService.getAllFounders();
      setFounders(data || []);
    } catch (err) {
      showError(err.message || 'Failed to load founders.');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchFounders();
  }, [fetchFounders]);

  const filteredFounders = useMemo(() => {
    if (!searchQuery.trim()) return founders;
    const q = searchQuery.toLowerCase();
    return founders.filter(
      (f) =>
        f.name?.toLowerCase().includes(q) ||
        f.role?.toLowerCase().includes(q) ||
        f.bio?.toLowerCase().includes(q)
    );
  }, [founders, searchQuery]);

  const handleOpenAdd = () => {
    setEditingFounder(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingFounder(item);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (item) => {
    setDeletingFounder(item);
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingFounder) {
        await founderService.updateFounder(editingFounder._id, formData);
        showSuccess(`Founder "${formData.get('name')}" updated successfully!`);
      } else {
        await founderService.createFounder(formData);
        showSuccess(`Founder "${formData.get('name')}" created successfully!`);
      }
      setIsFormOpen(false);
      fetchFounders();
    } catch (err) {
      showError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingFounder) return;
    setIsDeleting(true);
    try {
      await founderService.deleteFounder(deletingFounder._id);
      showSuccess(`Founder "${deletingFounder.name}" deleted successfully.`);
      setIsConfirmOpen(false);
      fetchFounders();
    } catch (err) {
      showError(err.message || 'Failed to delete founder.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Founders Management</h1>
          <p className="admin-page-subtitle">
            Manage church founders, biographies, and historical portraits displayed on the website.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <AddIcon fontSize="small" /> Add Founder
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-input" style={{ maxWidth: '400px' }}>
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="Search founders by name, role, biography..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredFounders.length === 0 ? (
        <div className="admin-empty-state">
          <HistoryEduIcon style={{ fontSize: 48, color: '#9ca3af' }} />
          <h3>No founders found</h3>
          <p>
            {searchQuery
              ? 'No founder matches your search query. Try clearing the search.'
              : 'Add church founders to showcase their spiritual legacy.'}
          </p>
          {!searchQuery && (
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleOpenAdd}
              style={{ marginTop: '1rem' }}
            >
              <AddIcon fontSize="small" /> Add Founder
            </button>
          )}
        </div>
      ) : (
        <FadeIn>
          <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFounders.map((item) => (
              <div key={item._id} className="admin-event-card">
                <div className="event-card-media" style={{ height: '240px' }}>
                  {item.image || item.img ? (
                    <img
                      src={getOptimizedImageUrl(item.image || item.img, 600)}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="event-media-placeholder">
                      <HistoryEduIcon style={{ fontSize: 40, opacity: 0.4 }} />
                    </div>
                  )}
                  <span className="event-tag-pill">{item.role || 'Founder'}</span>
                </div>

                <div className="event-card-content">
                  <h3 className="event-title">{item.name}</h3>
                  <p className="event-subtitle" style={{ color: '#4b5563', fontWeight: 500 }}>
                    {item.role || 'Founder'}
                  </p>

                  {(item.bio || item.description) && (
                    <p
                      className="text-sm text-gray-600 line-clamp-3"
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.4',
                        color: '#4b5563',
                      }}
                    >
                      {item.bio || item.description}
                    </p>
                  )}
                </div>

                <div className="event-card-footer">
                  <button
                    type="button"
                    className="card-action-btn edit"
                    onClick={() => handleOpenEdit(item)}
                  >
                    <EditOutlinedIcon fontSize="small" /> Edit
                  </button>

                  <button
                    type="button"
                    className="card-action-btn delete"
                    onClick={() => handleOpenDelete(item)}
                  >
                    <DeleteOutlineIcon fontSize="small" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Form Modal for Create & Edit */}
      <FounderFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingFounder}
        isLoading={isSubmitting}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Founder"
        message={`Are you sure you want to delete "${deletingFounder?.name}"? This action will remove the founder profile permanently.`}
        confirmText="Delete Founder"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
