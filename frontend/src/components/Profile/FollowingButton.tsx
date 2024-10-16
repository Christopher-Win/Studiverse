import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { getCookie } from '../../Context/AuthContext';
import { RemoveFriend } from '../../services/RemoveFriendService';
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
                const response = await RemoveFriend(currentTargetUser);
                setIsFollowing(false);
            }
            console.log('Unfollowed:', currentTargetUser);
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