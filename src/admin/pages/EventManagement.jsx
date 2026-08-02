import { useState, useEffect, useCallback, useMemo } from 'react';
import { eventService } from '../services/eventService';
import { useNotification } from '../context/NotificationContext';
import EventFormModal from '../components/events/EventFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import EventCardSkeleton from '../../components/skeletons/EventCardSkeleton';
import { FadeIn } from '../../components/skeletons/Skeleton';
import { CircularProgress } from '@mui/material';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm delete dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [togglingPostId, setTogglingPostId] = useState(null);

  const { showSuccess, showError } = useNotification();

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      showError(err.message || 'Failed to load events.');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Status filter
      if (statusFilter !== 'all' && ev.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          ev.title?.toLowerCase().includes(q) ||
          ev.subtitle?.toLowerCase().includes(q) ||
          ev.tag?.toLowerCase().includes(q) ||
          ev.dateRange?.toLowerCase().includes(q) ||
          ev.scripture?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [events, statusFilter, searchQuery]);

  // Status counts for tabs
  const counts = useMemo(() => {
    return {
      all: events.length,
      upcoming: events.filter((e) => e.status === 'upcoming').length,
      ongoing: events.filter((e) => e.status === 'ongoing').length,
      past: events.filter((e) => e.status === 'past').length,
    };
  }, [events]);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (eventItem) => {
    setEditingEvent(eventItem);
    setIsFormOpen(true);
  };

  const handleOpenDelete = (eventItem) => {
    setDeletingEvent(eventItem);
    setIsConfirmOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent._id, formData);
        showSuccess(`Event "${formData.get('title')}" updated successfully!`);
      } else {
        await eventService.createEvent(formData);
        showSuccess(`Event "${formData.get('title')}" created successfully!`);
      }
      setIsFormOpen(false);
      fetchEvents();
    } catch (err) {
      showError(err.message || 'Operation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;
    setIsDeleting(true);
    try {
      await eventService.deleteEvent(deletingEvent._id);
      showSuccess(`Event "${deletingEvent.title}" deleted successfully.`);
      setIsConfirmOpen(false);
      fetchEvents();
    } catch (err) {
      showError(err.message || 'Failed to delete event.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePost = async (eventItem) => {
    const next = !eventItem.isPosted;
    setTogglingPostId(eventItem._id);
    try {
      await eventService.togglePost(eventItem._id, next);
      showSuccess(
        next
          ? `"${eventItem.title}" is now live on the website.`
          : `"${eventItem.title}" has been unpublished.`
      );
      fetchEvents();
    } catch (err) {
      showError(err.message || 'Failed to update event.');
    } finally {
      setTogglingPostId(null);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Event Management</h1>
          <p className="admin-page-subtitle">
            Create, schedule, and manage church conferences, camp meetings, and special events.
          </p>
        </div>
        <button type="button" className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <AddIcon fontSize="small" /> Add Event
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="admin-toolbar flex-col gap-3">
        <div className="admin-tabs-row">
          <button
            type="button"
            className={`admin-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All Events <span className="tab-badge">{counts.all}</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${statusFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusFilter('upcoming')}
          >
            Upcoming <span className="tab-badge upcoming">{counts.upcoming}</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${statusFilter === 'ongoing' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ongoing')}
          >
            Ongoing <span className="tab-badge ongoing">{counts.ongoing}</span>
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${statusFilter === 'past' ? 'active' : ''}`}
            onClick={() => setStatusFilter('past')}
          >
            Past <span className="tab-badge past">{counts.past}</span>
          </button>
        </div>

        <div className="admin-search-input">
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            type="text"
            placeholder="Search events by title, tag, theme, scripture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="admin-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="admin-empty-state">
          <EventOutlinedIcon style={{ fontSize: 48, color: '#9ca3af' }} />
          <h3>No events found</h3>
          <p>
            {searchQuery || statusFilter !== 'all'
              ? 'No event matches your filter criteria. Try clearing search or switching tabs.'
              : 'Create your first church event poster and schedule.'}
          </p>
          {(!searchQuery && statusFilter === 'all') && (
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={handleOpenAdd}
              style={{ marginTop: '1rem' }}
            >
              <AddIcon fontSize="small" /> Add Event
            </button>
          )}
        </div>
      ) : (
        <FadeIn>
          <div className="admin-cards-grid">
            {filteredEvents.map((eventItem) => (
              <div key={eventItem._id} className="admin-event-card">
                <div className="event-card-media">
                  {eventItem.image ? (
                    <img src={getOptimizedImageUrl(eventItem.image, 800)} alt={eventItem.title} />
                  ) : (
                    <div className="event-media-placeholder">
                      <EventOutlinedIcon style={{ fontSize: 40, opacity: 0.4 }} />
                    </div>
                  )}
                  <span className={`status-pill status-${eventItem.status}`}>
                    {eventItem.status}
                  </span>

                  {eventItem.tag && (
                    <span className="event-tag-pill">{eventItem.tag}</span>
                  )}
                </div>

                <div className="event-card-content">
                  <h3 className="event-title">{eventItem.title}</h3>
                  {eventItem.subtitle && (
                    <p className="event-subtitle">{eventItem.subtitle}</p>
                  )}

                  <div className="event-info-row">
                    <CalendarMonthOutlinedIcon className="info-icon" fontSize="small" />
                    <span className="font-medium">{eventItem.dateRange}</span>
                  </div>

                  {eventItem.scripture && (
                    <div className="event-info-row">
                      <MenuBookOutlinedIcon className="info-icon" fontSize="small" />
                      <span className="italic-scripture">&quot;{eventItem.scripture}&quot;</span>
                    </div>
                  )}

                  {eventItem.times && (eventItem.times.sabbath || eventItem.times.otherDays) && (
                    <div className="event-schedule-box">
                      <div className="schedule-header">
                        <AccessTimeOutlinedIcon fontSize="small" /> Schedule
                      </div>
                      {eventItem.times.sabbath && (
                        <div className="schedule-item">
                          <strong>Sabbath:</strong> {eventItem.times.sabbath}
                        </div>
                      )}
                      {eventItem.times.otherDays && (
                        <div className="schedule-item">
                          <strong>Weekdays:</strong> {eventItem.times.otherDays}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="event-card-footer">
                  {/* Edit — left */}
                  <button
                    type="button"
                    className="card-action-btn edit"
                    onClick={() => handleOpenEdit(eventItem)}
                  >
                    <EditOutlinedIcon fontSize="small" /> Edit
                  </button>

                  {/* Post / Unpost — right */}
                  <button
                    type="button"
                    className={`card-action-btn ${eventItem.isPosted ? 'post-active' : 'post'}`}
                    onClick={() => handleTogglePost(eventItem)}
                    disabled={togglingPostId === eventItem._id}
                    title={eventItem.isPosted ? 'Click to unpublish' : 'Click to publish to website'}
                  >
                    {togglingPostId === eventItem._id ? (
                      <CircularProgress size={12} color="inherit" />
                    ) : eventItem.isPosted ? (
                      '✓ Posted'
                    ) : (
                      'Post'
                    )}
                  </button>

                  {/* Delete — destructive, visually separated */}
                  <button
                    type="button"
                    className="card-action-btn delete"
                    onClick={() => handleOpenDelete(eventItem)}
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
      <EventFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEvent}
        isLoading={isSubmitting}
      />

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${deletingEvent?.title}"? This event poster and schedule will be permanently removed.`}
        confirmText="Delete Event"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
