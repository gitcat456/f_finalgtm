import { useState, useEffect, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function ImageUploadPreview({
  label,
  currentImageUrl,
  selectedFile,
  onFileSelect,
  onRemove,
  aspectRatio = '16/9',
  hintText = 'PNG, JPG, WEBP up to 5MB',
  compact = false,
  maxHeight = '180px',
}) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Generate object URL for live local file preview
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const activeImage = previewUrl || currentImageUrl;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPEG, PNG, WEBP).');
        return;
      }
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`admin-image-upload-wrapper ${compact ? 'compact' : ''}`}>
      {label && <label className="admin-form-label">{label}</label>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/avif"
        style={{ display: 'none' }}
      />

      {activeImage ? (
        <div
          className="admin-image-preview-card"
          style={{
            maxHeight: maxHeight || '180px',
            height: maxHeight || '180px',
            width: '100%',
          }}
        >
          <img
            src={activeImage}
            alt="Preview"
            className="admin-image-preview-img"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="admin-image-preview-overlay">
            <span className="preview-badge">
              {selectedFile ? 'New Selection' : 'Current Image'}
            </span>
            <div className="preview-actions">
              <button
                type="button"
                className="preview-btn replace"
                onClick={triggerInput}
                title="Replace image"
              >
                <ChangeCircleIcon fontSize="small" />
                Replace
              </button>
              {(selectedFile || currentImageUrl) && onRemove && (
                <button
                  type="button"
                  className="preview-btn remove"
                  onClick={onRemove}
                  title="Remove image"
                >
                  <DeleteOutlineIcon fontSize="small" />
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`admin-image-dropzone ${isDragging ? 'dragging' : ''}`}
          style={{
            maxHeight: maxHeight || '180px',
            height: maxHeight || '180px',
            minHeight: '120px',
            width: '100%',
          }}
          onClick={triggerInput}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="dropzone-icon">
            <CloudUploadIcon fontSize="medium" />
          </div>
          <div className="dropzone-text" style={{ fontSize: '0.85rem' }}>
            <span className="highlight font-semibold">Click to upload</span> or drag and drop
          </div>
          {hintText && <div className="dropzone-hint">{hintText}</div>}
        </div>
      )}
    </div>
  );
}
