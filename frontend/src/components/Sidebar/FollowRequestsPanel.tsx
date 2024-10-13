import React,{useState, useEffect} from 'react';
import { fetchPendingFriendRequests } from '../../services/FollowRequestsService' // Adjust the import path as needed
import './FollowRequestsPanel.css'; // Separate CSS file for the panel

interface FollowRequestsPanelProps {
  isOpen: boolean;
  toggleInboxPanel: () => void;
}


const FollowRequestsPanel: React.FC<FollowRequestsPanelProps> = ({ isOpen, toggleInboxPanel }) => {
    const [followRequests, setFollowRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadFollowRequests = async () => {
        try {
        const data = await fetchPendingFriendRequests();
        setFollowRequests(data);
        console.log('Follow requests response: ', data);
        } catch (error) {
        console.error('Error loading follow requests', error);
        } finally {
        setLoading(false);
        }
    };

    loadFollowRequests();
    }, []);
    
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