import React from 'react';
import './FollowRequestsPanel.css'; // Separate CSS file for the panel

interface FollowRequestsPanelProps {
  isOpen: boolean;
  toggleInboxPanel: () => void;
}

const FollowRequestsPanel: React.FC<FollowRequestsPanelProps> = ({ isOpen, toggleInboxPanel }) => {
  return (
    <div className={`follow-requests-panel ${isOpen ? 'open' : 'closed'}`}>
        <div className="panel-header">
            <h2>Follow Requests</h2>
            <button className="close-button" onClick={toggleInboxPanel}>
                <i className="fas fa-times"></i>
            </button>
        </div>
        <div className="panel-content">
            {/* Render follow requests content here */}
            <p>No new follow requests.</p>
        </div>
    </div>
  );
};

export default FollowRequestsPanel;