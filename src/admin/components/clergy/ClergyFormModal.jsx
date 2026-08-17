import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ImageUploadPreview from '../ui/ImageUploadPreview';
import CircularProgress from '@mui/material/CircularProgress';
import { sanitizeInput } from '../../../utils/validationUtils';

export default function ClergyFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        title: initialData.title || initialData.role || '',
        bio: initialData.bio || initialData.description || '',
        image: initialData.image || initialData.img || '',
      });
      setImageFile(null);
    } else {
      setFormData({
        name: '',
        title: '',
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
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.title.trim()) errs.title = 'Title / Position is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('title', formData.title.trim());
    payload.append('bio', formData.bio.trim());

    if (imageFile) {
      payload.append('image', imageFile);
    }

    onSubmit(payload);
  };

  const modalTitle = initialData ? 'Edit Clergy Member' : 'Add Clergy Member';
  const modalSubtitle = initialData
    ? 'Update clergy details, title, biography, and image.'
    : 'Add a new clergy member to the leadership team.';

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
                placeholder="e.g. Gibson Onunga"
                className={errors.name ? 'is-invalid' : ''}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="admin-input-group">
              <label>Title / Position *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Bishop, Assistant Bishop, Senior Pastor"
                className={errors.title ? 'is-invalid' : ''}
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="admin-input-group">
              <label>Biography / Description</label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Pastoral experience and role in the ministry..."
              />
            </div>

            <ImageUploadPreview
              label="Clergy Member Image"
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
              'Add Clergy Member'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
