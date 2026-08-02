import { createContext, useContext, useState, useCallback } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 4000) => {
      const id = Date.now() + Math.random().toString();
      const newToast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (msg, duration) => addToast(msg, 'success', duration),
    [addToast]
  );
  const showError = useCallback(
    (msg, duration) => addToast(msg, 'error', duration),
    [addToast]
  );
  const showInfo = useCallback(
    (msg, duration) => addToast(msg, 'info', duration),
    [addToast]
  );

  return (
    <NotificationContext.Provider
      value={{ showSuccess, showError, showInfo, addToast, removeToast }}
    >
      {children}

      {/* Floating Toasts Container */}
      <div className="admin-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`admin-toast admin-toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'success' && <CheckCircleOutlineIcon fontSize="small" />}
              {toast.type === 'error' && <ErrorOutlineIcon fontSize="small" />}
              {toast.type === 'info' && <InfoOutlinedIcon fontSize="small" />}
            </div>
            <div className="toast-content">{toast.message}</div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
            >
              <CloseIcon style={{ fontSize: 16 }} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
