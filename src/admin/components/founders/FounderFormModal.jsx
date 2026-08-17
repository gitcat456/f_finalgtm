import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ImageUploadPreview from '../ui/ImageUploadPreview';
import CircularProgress from '@mui/material/CircularProgress';
import { sanitizeInput } from '../../../utils/validationUtils';

export default function FounderFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Founder',
    bio: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        role: initialData.role || 'Founder',
        bio: initialData.bio || initialData.description || '',
        image: initialData.image || initialData.img || '',
      });
      setImageFile(null);
    } else {
      setFormData({
        name: '',
        role: 'Founder',
        bio: '',
        image: '',
      });
      setImageFile(null);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Founder name is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('role', formData.role.trim() || 'Founder');
    payload.append('bio', formData.bio.trim());

    if (imageFile) {
      payload.append('image', imageFile);
    }

    onSubmit(payload);
  };

  const modalTitle = initialData ? 'Edit Founder' : 'Add New Founder';
  const modalSubtitle = initialData
    ? 'Update founder information, role, biography, and image.'
    : 'Add a new founder to the church history.';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      size="md"
    >
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="admin-form-column">
            <div className="admin-input-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="admin-input-group">
              <label>Role / Title</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Founder, Co-Founder"
              />
            </div>

            <div className="admin-input-group">
              <label>Biography / Description</label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short biography or contribution to GTM Ministries..."
              />
            </div>

            <ImageUploadPreview
              label="Founder Portrait Image"
              currentImageUrl={formData.image}
              selectedFile={imageFile}
              onFileSelect={(file) => setImageFile(file)}
              onRemove={() => {
                setImageFile(null);
                setFormData((prev) => ({ ...prev, image: '' }));
              }}
              maxHeight="160px"
              aspectRatio="3/4"
              hintText="Recommended dimensions: Portrait mode, PNG, JPG or WEBP up to 5MB"
            />
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" style={{ marginRight: 8 }} />
                Saving...
              </>
            ) : initialData ? (
              'Save Changes'
            ) : (
              'Add Founder'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
