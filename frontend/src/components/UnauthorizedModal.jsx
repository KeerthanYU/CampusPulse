import React from 'react';

const UnauthorizedModal = ({ open, onClose, message = 'Access denied' }) => {
  if (!open) return null;

  return (
    <div className="unauth-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="unauth-card" onClick={(e) => e.stopPropagation()}>
        <div className="unauth-gradient" />
        <div className="unauth-body">
          <h2>Access Denied</h2>
          <p className="muted">{message}</p>
          <div style={{marginTop:14}}>
            <button className="btn-secondary" onClick={onClose}>Okay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedModal;
