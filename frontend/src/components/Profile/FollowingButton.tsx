import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { getCookie } from '../../Context/AuthContext';
axios.defaults.withCredentials = true;

interface FollowingButtonProps {
    user: string;
    targetUser: string;
    following: boolean;
}

const FollowingButton: React.FC<FollowingButtonProps> = ({ user, targetUser, following }) => {
    const [isFollowing, setIsFollowing] = useState(following);
    const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUser);

    const handleUnfollow = async () => {
        try {
            if (isFollowing) {
                // Unfollow logic
                const response = await axios.post(`http://127.0.0.1:8000/${targetUser}/remove`, {
                    withCredentials: true, // Send cookies with the request

                    headers: {
                        'Authorization': `Token ${getCookie('sessionid')}`,
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                });
                console.log(response.data);
                setIsFollowing(false);
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <button className={`follow-button ${isFollowing ? 'unfollow' : 'follow'}`} onClick={handleUnfollow}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowingButton;