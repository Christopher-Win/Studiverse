import React,{useState, useEffect, ReactNode} from 'react';
import { fetchPendingFriendRequests } from '../../services/FollowRequestsService' // Adjust the import path as needed
import { fetchUserData } from '../../services/ProfileRenderService'; // Adjust the import path as needed
import FollowRequestsList from './FollowRequestsList'; // Adjust the import path as needed
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
    const [followRequests, setFollowRequests] = useState<User[]>([]);
    // const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFollowRequests = async () => {
            try {
                const response = await fetchPendingFriendRequests(); // Sets data to array of user dictionaries
                // const users = data.users
                setFollowRequests(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error loading follow requests', error);
            } finally {
                setLoading(false);
            }
           
        };
        loadFollowRequests();
    }, []);
    console.log('Follow requests:', followRequests);
  return (
    <div className={`follow-requests-panel ${isOpen ? 'open' : 'closed'}`}>
        <div className="panel-header button">
            <button className="close-button" onClick={toggleInboxPanel}>
                <i className='fa-solid fa-arrow-left'></i>            
            </button>
            <div className='panel-header title'>
                <span>Follow Requests</span>
            </div>
            <div className='w-12'></div>
        </div>
        <div>
            <FollowRequestsList results={followRequests} />
        </div>
    </div>
  );
};

export default FollowRequestsPanel;