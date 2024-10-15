import React, {ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../../Context/AuthContext';
import { getCookie } from '../../Context/AuthContext';
import { fetchFollowersSerivce } from '../../services/FetchFollowersService';

interface FollowerCountProps {
    user: {
        username: string;
        netID: string;
    };
    targetUser:{
        username: string;
        netID: string;
    }
    
}

const FollowerCount: React.FC<FollowerCountProps> = ({ user, targetUser }) => {
    const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUser);
    const [FollowerCount, setFollowerCount] = useState(null);

    useEffect(() => {
        const fetchFollowerCount = async () => {
            console.log(targetUser.netID);
            const response = await fetchFollowersSerivce(targetUser.netID);// targetUserNetID
            setFollowerCount(response.data.count);
        };
        fetchFollowerCount();
    }, []);

    return (
        <div className="follower-count">
            <a href={`/${targetUser.username}/followers`}> 
                <span>{FollowerCount} Followers</span>
            </a>
           
        </div>
    );
};

export default FollowerCount;