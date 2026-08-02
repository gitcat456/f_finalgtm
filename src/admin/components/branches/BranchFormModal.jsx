import { useState, useEffect, useRef } from 'react';
import Modal from '../ui/Modal';
import ImageUploadPreview from '../ui/ImageUploadPreview';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import CircularProgress from '@mui/material/CircularProgress';
import { MAX_PASTORS_PER_BRANCH, DEFAULT_SERVICE_SCHEDULE } from '../../../constants/branchConstants';
import {
  validatePhoneNumber,
  sanitizePhoneNumberInput,
  sanitizeNameInput,
} from '../../../utils/validationUtils';
import { getPastorImage } from '../../../data/pastorData';

export default function BranchFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    img: '',
    isPosted: true,
  });

  const [branchImageFile, setBranchImageFile] = useState(null);
  const [pastors, setPastors] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const pastorFileInputRefs = useRef([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location: initialData.location || '',
        img: initialData.img || '',
        isPosted: initialData.isPosted !== false,
      });
      setBranchImageFile(null);
      if (Array.isArray(initialData.pastors) && initialData.pastors.length > 0) {
        setPastors(
          initialData.pastors.slice(0, MAX_PASTORS_PER_BRANCH).map((p) => ({
            name: p.name || '',
            contact: p.contact || '',
            image: p.image || '',
            imageFile: null,
            previewUrl: null,
          }))
        );
      } else {
        setPastors([
          { name: '', contact: '', image: '', imageFile: null, previewUrl: null },
        ]);
      }
    } else {
      setFormData({
        name: '',
        location: '',
        img: '',
        isPosted: true,
      });
      setBranchImageFile(null);
      setPastors([
        { name: '', contact: '', image: '', imageFile: null, previewUrl: null },
      ]);
    }
    setErrors({});
    setTouched({});
  }, [initialData, isOpen]);

  // Cleanup local image URLs
  useEffect(() => {
    return () => {
      pastors.forEach((p) => {
        if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      });
    };
  }, [pastors]);

  // Form Validation logic
  const runValidation = (currentForm, currentPastors) => {
    const errs = {};

    if (!currentForm.name || !currentForm.name.trim()) {
      errs.name = 'Branch name is required';
    } else if (currentForm.name.trim().length < 2) {
      errs.name = 'Branch name must be at least 2 characters';
    }

    if (!currentForm.location || !currentForm.location.trim()) {
      errs.location = 'Location is required';
    } else if (currentForm.location.trim().length < 2) {
      errs.location = 'Location must be at least 2 characters';
    }

    currentPastors.forEach((p, idx) => {
      if (p.name.trim() === '' && (p.contact.trim() !== '' || p.imageFile || p.image)) {
        errs[`pastor_${idx}_name`] = 'Pastor name is required when details are entered';
      }

      if (p.contact && p.contact.trim()) {
        const phoneCheck = validatePhoneNumber(p.contact);
        if (!phoneCheck.isValid) {
          errs[`pastor_${idx}_contact`] = phoneCheck.error;
        }
      }
    });

    return errs;
  };

  const currentErrors = runValidation(formData, pastors);
  const isFormValid =
    Object.keys(currentErrors).length === 0 &&
    formData.name.trim() !== '' &&
    formData.location.trim() !== '';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      setErrors(runValidation(next, pastors));
      return next;
    });
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Real-time sanitized Pastor Name change
  const handlePastorNameChange = (index, rawVal) => {
    const sanitized = sanitizeNameInput(rawVal);
    setPastors((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], name: sanitized };
      setErrors(runValidation(formData, updated));
      return updated;
    });
    setTouched((prev) => ({ ...prev, [`pastor_${index}_name`]: true }));
  };

  // Real-time sanitized Pastor Contact change
  const handlePastorContactChange = (index, rawVal) => {
    const sanitized = sanitizePhoneNumberInput(rawVal);
    setPastors((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], contact: sanitized };
      setErrors(runValidation(formData, updated));
      return updated;
    });
    setTouched((prev) => ({ ...prev, [`pastor_${index}_contact`]: true }));
  };

  // Pastor photo select
  const handlePastorFileSelect = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, WEBP).');
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPastors((prev) => {
        const updated = [...prev];
        if (updated[index].previewUrl) {
          URL.revokeObjectURL(updated[index].previewUrl);
        }
        updated[index] = {
          ...updated[index],
          imageFile: file,
          previewUrl: objectUrl,
        };
        return updated;
      });
    }
  };

  const handleAddPastor = () => {
    if (pastors.length >= MAX_PASTORS_PER_BRANCH) return;
    setPastors((prev) => [
      ...prev,
      { name: '', contact: '', image: '', imageFile: null, previewUrl: null },
    ]);
  };

  const handleRemovePastor = (index) => {
    setPastors((prev) => {
      const p = prev[index];
      if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      const updated = prev.filter((_, i) => i !== index);
      setErrors(runValidation(formData, updated));
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalErrors = runValidation(formData, pastors);
    setErrors(finalErrors);
    if (Object.keys(finalErrors).length > 0) return;

    const validPastors = pastors.filter(
      (p) => p.name.trim() !== '' || p.contact.trim() !== '' || p.imageFile || p.image
    );

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('location', formData.location.trim());
    payload.append('services', DEFAULT_SERVICE_SCHEDULE);
    payload.append('isPosted', formData.isPosted ? 'true' : 'false');

    if (branchImageFile) {
      payload.append('img', branchImageFile);
    }

    const pastorsData = [];
    const pastorImageIndices = [];

    validPastors.forEach((p, idx) => {
      pastorsData.push({
        name: p.name.trim(),
        contact: p.contact.trim(),
        image: p.image || '',
      });

      if (p.imageFile) {
        payload.append('pastorImages', p.imageFile);
        pastorImageIndices.push(idx);
      }
    });

    payload.append('pastors', JSON.stringify(pastorsData));
    if (pastorImageIndices.length > 0) {
      payload.append('pastorImageIndices', JSON.stringify(pastorImageIndices));
    }

    onSubmit(payload);
  };

  const modalTitle = initialData ? 'Edit Branch' : 'Add New Branch';
  const modalSubtitle = initialData
    ? 'Update branch details and assigned leaders.'
    : 'Create a new church branch location for public display.';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle={modalSubtitle}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="admin-form">
        {/* Two-Column Grid Layout (Restored UI) */}
        <div className="admin-form-grid">
          {/* Left Column: Main Branch Details */}
          <div className="admin-form-column">
            {/* Branch Name */}
            <div className="admin-input-group">
              <label>Branch Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Nairobi Central Branch"
                className={errors.name && touched.name ? 'is-invalid' : ''}
                maxLength={100}
              />
              {errors.name && touched.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            {/* Location */}
            <div className="admin-input-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Upper Hill, Off Hospital Road"
                className={errors.location && touched.location ? 'is-invalid' : ''}
                maxLength={150}
              />
              {errors.location && touched.location && (
                <span className="field-error">{errors.location}</span>
              )}
            </div>

            {/* Compact Branch Banner Image Upload (Requirement 1: Quick visual preview box) */}
            <ImageUploadPreview
              label="Branch Banner Photo"
              currentImageUrl={formData.img}
              selectedFile={branchImageFile}
              onFileSelect={(file) => setBranchImageFile(file)}
              onRemove={() => {
                setBranchImageFile(null);
                setFormData((prev) => ({ ...prev, img: '' }));
              }}
              aspectRatio="16/9"
              maxHeight="130px"
              compact={false}
              hintText="PNG, JPG or WEBP"
            />
          </div>

          {/* Right Column: Pastors/Leaders Section (Requirement 4, 6, 7 & 9) */}
          <div className="admin-form-column">
            <div className="pastors-section-header">
              <div>
                <h4 className="section-title">Branch Pastors / Leaders</h4>
                <p className="section-subtitle">
                  Assign up to 2 pastors to this branch.
                </p>
              </div>

              {/* Requirement 7 & 9: Styled Add Pastor Button, disabled at 2 */}
              <button
                type="button"
                className={`admin-btn admin-btn-sm ${
                  pastors.length >= MAX_PASTORS_PER_BRANCH
                    ? 'admin-btn-secondary cursor-not-allowed opacity-50'
                    : 'admin-btn-outline'
                }`}
                onClick={handleAddPastor}
                disabled={pastors.length >= MAX_PASTORS_PER_BRANCH}
                title={
                  pastors.length >= MAX_PASTORS_PER_BRANCH
                    ? 'Maximum 2 pastors reached'
                    : 'Add pastor entry'
                }
              >
                <PersonAddIcon fontSize="small" />
                {pastors.length >= MAX_PASTORS_PER_BRANCH
                  ? 'Max 2 Reached'
                  : '+ Add Pastor'}
              </button>
            </div>

            <div className="pastors-list-container">
              {pastors.map((pastor, index) => {
                const activePhoto =
                  pastor.previewUrl || pastor.image || getPastorImage(pastor.name);
                const nameErr = errors[`pastor_${index}_name`];
                const contactErr = errors[`pastor_${index}_contact`];

                return (
                  <div key={index} className="pastor-item-card flex items-center gap-3">
                    {/* Left: Compact Circular Image Avatar Upload (Requirement 4 & 6) */}
                    <div
                      className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-200 bg-gray-200 cursor-pointer group shadow-sm"
                      onClick={() => pastorFileInputRefs.current[index]?.click()}
                      title="Click to change photo"
                    >
                      <img
                        src={activePhoto}
                        alt={pastor.name || 'Pastor'}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <CameraAltIcon sx={{ fontSize: 16, color: '#fff' }} />
                      </div>
                    </div>

                    <input
                      type="file"
                      ref={(el) => (pastorFileInputRefs.current[index] = el)}
                      onChange={(e) => handlePastorFileSelect(index, e)}
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      style={{ display: 'none' }}
                    />

                    {/* Right: Name on top, Contact beneath (Requirement 4 & 5) */}
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div>
                        <input
                          type="text"
                          placeholder="Pastor Name *"
                          value={pastor.name}
                          onChange={(e) =>
                            handlePastorNameChange(index, e.target.value)
                          }
                          className={`w-full text-xs font-semibold px-2.5 py-1.5 border rounded-lg bg-white outline-none ${
                            nameErr ? 'is-invalid' : ''
                          }`}
                          maxLength={80}
                        />
                        {nameErr && (
                          <span className="field-error text-[10px]">{nameErr}</span>
                        )}
                      </div>

                      <div className="relative">
                        <PhoneIcon
                          sx={{
                            fontSize: 12,
                            color: '#9ca3af',
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Contact (e.g. +254712345678)"
                          value={pastor.contact}
                          onChange={(e) =>
                            handlePastorContactChange(index, e.target.value)
                          }
                          className={`w-full text-xs pl-6 pr-2.5 py-1 border rounded-lg bg-white font-mono outline-none ${
                            contactErr ? 'is-invalid' : ''
                          }`}
                          maxLength={13}
                        />
                        {contactErr && (
                          <span className="field-error text-[10px]">
                            {contactErr}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Remove Pastor button */}
                    {pastors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePastor(index)}
                        className="pastor-remove-btn"
                        title="Remove Pastor"
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Form Actions (Restored Original Buttons) */}
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
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" style={{ marginRight: 8 }} />
                Saving...
              </>
            ) : initialData ? (
              'Save Changes'
            ) : (
              'Post Branch'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
