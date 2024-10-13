import React, {ReactNode, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../../Context/AuthContext';
import { getCookie } from '../../Context/AuthContext';

interface FollowButtonProps {
    user: string;
    targetUser: string;
    follow_status: string;
    getFollowStatus: (followStatus: string) => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user, targetUser, getFollowStatus, follow_status }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUser);
    const [followStatus, setFollowStatus] = useState(follow_status);

    const handleFollow = async () => {
        const csrftoken = getCookie('csrftoken');
        console.log(csrftoken);
        if(csrftoken){
            console.log("csrftoken is present");
            try {
                if (follow_status === 'following') {
                    // Unfollow logic
                    await axios.post('/api/unfollow');
                } else {
                    // Follow logic
                    const response = await axios.post(`http://localhost:8000/${targetUser}/add`,{}, {
                        headers: {
                            'X-CSRFToken': csrftoken,
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // Send cookies with the request
                        });
                    console.log(response.data);
                    getFollowStatus("pending");
                }
            } catch (error) {
                console.error('Error following/unfollowing user:', error);
            }
        }
    };

    return (
        <button className={`follow-button follow`} onClick={handleFollow}>
            Follow
        </button>
    );
};

export default FollowButton;