import Modal from './Modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Reusable Confirmation Dialog for destructive operations (e.g. Delete).
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  confirmVariant = 'danger',
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="admin-confirm-content">
        <div className={`admin-confirm-icon admin-confirm-icon-${confirmVariant}`}>
          <WarningAmberIcon style={{ fontSize: 32 }} />
        </div>
        <h4 className="admin-confirm-title">{title}</h4>
        <p className="admin-confirm-message">{message}</p>

        <div className="admin-confirm-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`admin-btn admin-btn-${confirmVariant}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" style={{ marginRight: 8 }} />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
