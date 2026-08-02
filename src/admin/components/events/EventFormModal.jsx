import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import ImageUploadPreview from '../ui/ImageUploadPreview';
import CircularProgress from '@mui/material/CircularProgress';
import { sanitizeInput } from '../../../utils/validationUtils';

export default function EventFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    status: 'upcoming',
    dateRange: '',
    monthYear: '',
    scripture: '',
    tag: '',
    note: '',
    vision: '',
    mission: '',
    sabbathTime: '',
    otherDaysTime: '',
    image: '',
    isPosted: true,
  });

  const [posterFile, setPosterFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        status: initialData.status || 'upcoming',
        dateRange: initialData.dateRange || '',
        monthYear: initialData.monthYear || '',
        scripture: initialData.scripture || '',
        tag: initialData.tag || '',
        note: initialData.note || '',
        vision: initialData.vision || '',
        mission: initialData.mission || '',
        sabbathTime: initialData.times?.sabbath || '',
        otherDaysTime: initialData.times?.otherDays || '',
        image: initialData.image || '',
        isPosted: initialData.isPosted !== false,
      });
      setPosterFile(null);
    } else {
      setFormData({
        title: '',
        subtitle: '',
        status: 'upcoming',
        dateRange: '',
        monthYear: '',
        scripture: '',
        tag: '',
        note: '',
        vision: '',
        mission: '',
        sabbathTime: '',
        otherDaysTime: '',
        image: '',
        isPosted: true,
      });
      setPosterFile(null);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      // Strip HTML/script tags from all text inputs in real-time
      const sanitized = sanitizeInput(value);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.dateRange.trim()) errs.dateRange = 'Date range is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append('title', formData.title.trim());
    payload.append('subtitle', formData.subtitle.trim());
    payload.append('status', formData.status);
    payload.append('dateRange', formData.dateRange.trim());
    payload.append('monthYear', formData.monthYear.trim());
    payload.append('scripture', formData.scripture.trim());
    payload.append('tag', formData.tag.trim());
    payload.append('note', formData.note.trim());
    payload.append('vision', formData.vision.trim());
    payload.append('mission', formData.mission.trim());
    payload.append('isPosted', formData.isPosted ? 'true' : 'false');

    // Send times as JSON string
    payload.append(
      'times',
      JSON.stringify({
        sabbath: formData.sabbathTime.trim(),
        otherDays: formData.otherDaysTime.trim(),
      })
    );

    if (posterFile) {
      payload.append('image', posterFile);
    }

    onSubmit(payload);
  };

  const modalTitle = initialData ? 'Edit Event' : 'Add New Event';
  const modalSubtitle = initialData
    ? 'Update event details, status, schedule, and poster.'
    : 'Publish a new church event with dates and program info.';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-grid">
          {/* Main Info */}
          <div className="admin-form-column">
            <div className="admin-input-group">
              <label>Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. National Youth Evangelism Camp"
                className={errors.title ? 'is-invalid' : ''}
              />
              {errors.title && <span className="field-error">{errors.title}</span>}
            </div>

            <div className="admin-input-group">
              <label>Subtitle / Theme</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g. Arise and Shine (Isaiah 60:1)"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-input-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="admin-select"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="past">Past</option>
                </select>
              </div>

              <div className="admin-input-group">
                <label>Category Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="e.g. Camp Meeting, Revival, Youth"
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-input-group">
                <label>Date Range *</label>
                <input
                  type="text"
                  name="dateRange"
                  value={formData.dateRange}
                  onChange={handleChange}
                  placeholder="e.g. Aug 15 - Aug 22, 2026"
                  className={errors.dateRange ? 'is-invalid' : ''}
                />
                {errors.dateRange && <span className="field-error">{errors.dateRange}</span>}
              </div>

              <div className="admin-input-group">
                <label>Month / Year</label>
                <input
                  type="text"
                  name="monthYear"
                  value={formData.monthYear}
                  onChange={handleChange}
                  placeholder="e.g. August 2026"
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Key Scripture</label>
              <input
                type="text"
                name="scripture"
                value={formData.scripture}
                onChange={handleChange}
                placeholder="e.g. Revelation 14:6-12"
              />
            </div>

            <div className="admin-input-group">
              <label>Special Note / Venue</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="e.g. All main services streamed live on YouTube & Facebook"
              />
            </div>
          </div>

          {/* Schedule & Image Upload */}
          <div className="admin-form-column">
            <ImageUploadPreview
              label="Event Poster Image"
              currentImageUrl={formData.image}
              selectedFile={posterFile}
              onFileSelect={(file) => setPosterFile(file)}
              onRemove={() => {
                setPosterFile(null);
                setFormData((prev) => ({ ...prev, image: '' }));
              }}
              aspectRatio="16/9"
              hintText="Poster dimensions: PNG, JPG or WEBP up to 5MB"
            />

            <div className="admin-form-section-title" style={{ marginTop: '1rem' }}>
              Service & Program Schedule
            </div>

            <div className="admin-input-group">
              <label>Sabbath Service Time</label>
              <input
                type="text"
                name="sabbathTime"
                value={formData.sabbathTime}
                onChange={handleChange}
                placeholder="e.g. 9:00 AM - 12:30 PM & 2:00 PM - 5:00 PM"
              />
            </div>

            <div className="admin-input-group">
              <label>Other Days Schedule</label>
              <input
                type="text"
                name="otherDaysTime"
                value={formData.otherDaysTime}
                onChange={handleChange}
                placeholder="e.g. Morning Devotion: 6:00 AM | Evening Revival: 5:30 PM"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-input-group">
                <label>Event Vision</label>
                <textarea
                  name="vision"
                  rows={2}
                  value={formData.vision}
                  onChange={handleChange}
                  placeholder="Key vision statement..."
                />
              </div>

              <div className="admin-input-group">
                <label>Event Mission</label>
                <textarea
                  name="mission"
                  rows={2}
                  value={formData.mission}
                  onChange={handleChange}
                  placeholder="Key mission statement..."
                />
              </div>
            </div>
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
              'Create Event'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
