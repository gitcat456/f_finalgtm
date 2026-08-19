import { useState, useEffect, useCallback, useMemo } from 'react';
import { clergyService } from '../services/clergyService';
import { useNotification } from '../context/NotificationContext';
import ClergyFormModal from '../components/clergy/ClergyFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EventCardSkeleton from '../../components/skeletons/EventCardSkeleton';
import { FadeIn } from '../../components/skeletons/Skeleton';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

export default function ClergyManagement() {
  const [clergy, setClergy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClergy, setEditingClergy] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingClergy, setDeletingClergy] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showSuccess, showError } = useNotification();

  const fetchClergy = useCallback(async () => {
    setLoading(true);
    try {
      const data = await clergyService.getAllClergy();
      setClergy(data || []);
    } catch (err) {
      showError(err.message || 'Failed to load clergy members.');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchClergy();
  }, [fetchClergy]);

  const filteredClergy = useMemo(() => {
    if (!searchQuery.trim()) return clergy;
    const q = searchQuery.toLowerCase();
    return clergy.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.title?.toLowerCase().includes(q) ||
        c.bio?.toLowerCase().includes(q)
    );
  }, [clergy, searchQuery]);

  const handleOpenAdd = () => {
    setEditingClergy(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingClergy(item);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (item) => {
    setDeletingClergy(item);
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingClergy) {
        await clergyService.updateClergy(editingClergy._id, formData);
        showSuccess(`Clergy member "${formData.get('name')}" updated successfully!`);
      } else {
        await clergyService.createClergy(formData);
        showSuccess(`Clergy member "${formData.get('name')}" created successfully!`);
      }
      setIsFormOpen(false);
      fetchClergy();
    } catch (err) {
      showError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingClergy) return;
    setIsDeleting(true);
    try {
      await clergyService.deleteClergy(deletingClergy._id);
      showSuccess(`Clergy member "${deletingClergy.name}" deleted successfully.`);
      setIsConfirmOpen(false);
      fetchClergy();
    } catch (err) {
      showError(err.message || 'Failed to delete clergy member.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Clergy Management</h1>
          <p className="admin-page-subtitle">
            Manage clergy members, titles, pastoral biographies, and leadership portraits.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <AddIcon fontSize="small" /> Add Clergy Member
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-input" style={{ maxWidth: '400px' }}>
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="Search clergy by name, title, biography..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredClergy.length === 0 ? (
        <div className="admin-empty-state">
          <PeopleOutlinedIcon style={{ fontSize: 48, color: '#9ca3af' }} />
          <h3>No clergy members found</h3>
          <p>
            {searchQuery
              ? 'No clergy member matches your search query. Try clearing search.'
              : 'Add clergy members to display your church leadership team.'}
          </p>
          {!searchQuery && (
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleOpenAdd}
              style={{ marginTop: '1rem' }}
            >
              <AddIcon fontSize="small" /> Add Clergy Member
            </button>
          )}
        </div>
      ) : (
        <FadeIn>
          <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredClergy.map((item) => (
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
                      <PeopleOutlinedIcon style={{ fontSize: 40, opacity: 0.4 }} />
                    </div>
                  )}
                  <span className="event-tag-pill">{item.title || 'Clergy'}</span>
                </div>

                <div className="event-card-content">
                  <h3 className="event-title">{item.name}</h3>
                  <p className="event-subtitle" style={{ color: '#0284c7', fontWeight: 600 }}>
                    {item.title || 'Clergy'}
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
      <ClergyFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingClergy}
        isLoading={isSubmitting}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Clergy Member"
        message={`Are you sure you want to delete "${deletingClergy?.name}"? This action will remove the clergy member profile permanently.`}
        confirmText="Delete Member"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
