import React, {ReactNode, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../AuthContext';
import { getCookie } from '../../components/AuthContext';

interface FollowButtonProps {
    user: string;
    targetUser: string;
    following: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ user, targetUser, following }) => {
    const [isFollowing, setIsFollowing] = useState(following);
    const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUser);

    const handleFollow = async () => {
        const csrftoken = getCookie('csrftoken');
        console.log(csrftoken);
        if(csrftoken){
            console.log("csrftoken is present");
            try {
                if (isFollowing) {
                    // Unfollow logic
                    await axios.post('/api/unfollow');
                    setIsFollowing(false);
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
                    setIsFollowing(true);
                }
            } catch (error) {
                console.error('Error following/unfollowing user:', error);
            }
        }
    };

    return (
        <button className={`follow-button ${isFollowing ? 'unfollow' : 'follow'}`} onClick={handleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    );
};

export default FollowButton;