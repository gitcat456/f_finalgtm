/**
 * Placeholder page for admin modules not yet implemented.
 * Used for Branches, Events, Clergy, Settings until CRUD is built.
 */
export default function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          marginBottom: '1rem',
        }}
      >
        🚧
      </div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#111827',
          margin: '0 0 0.5rem 0',
        }}
      >
        {title || 'Coming Soon'}
      </h2>
      <p
        style={{
          color: '#6b7280',
          fontSize: '0.9375rem',
          maxWidth: 360,
          lineHeight: 1.6,
        }}
      >
        This module is under development and will be available in a future
        update.
      </p>
    </div>
  );
}
