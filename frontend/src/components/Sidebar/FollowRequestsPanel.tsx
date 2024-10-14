import React,{useState, useEffect, ReactNode} from 'react';
import { fetchPendingFriendRequests } from '../../services/FollowRequestsService' // Adjust the import path as needed
import { fetchUserData } from '../../services/ProfileRenderService'; // Adjust the import path as needed
import './FollowRequestsPanel.css'; // Separate CSS file for the panel

interface FollowRequestsPanelProps {
  isOpen: boolean;
  toggleInboxPanel: () => void;
}
interface FollowRequest {
    id: number;
    from_user: string;
    to_user: string;
    timestamp: string;
}

interface User {
    netID: string;
    last_name: ReactNode;
    first_name: ReactNode;
    username: string;
    profile_image: string;
}

const FollowRequestsPanel: React.FC<FollowRequestsPanelProps> = ({ isOpen, toggleInboxPanel }) => {
    const [followRequests, setFollowRequests] = useState([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFollowRequests = async () => {
            try {
                const data = await fetchPendingFriendRequests();
                setFollowRequests(data);
                console.log('Follow requests response: ', data);
                const userPromises = data.users.map((user: User) => fetchUserData(user.username));
                // Resolve all promises and set the users array
                const usersData = await Promise.all(userPromises);
                setUsers(usersData);
            } catch (error) {
                console.error('Error loading follow requests', error);
            } finally {
                setLoading(false);
            }
           
        };
        loadFollowRequests();
        console.log('Follow requests:', users);
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