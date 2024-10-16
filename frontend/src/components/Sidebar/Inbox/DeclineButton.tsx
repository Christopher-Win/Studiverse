import React, {ReactNode, useState } from 'react';
import axios from 'axios';
// import '../../../Profile/Profile.css';
import { DeclinePendingFriendRequest } from '../../../services/DeclineFollowRequestService';

interface DeclineButtonProps {
    targetUserNetID: string;
    getFollowStatus?: (followStatus: string) => void;
    onDecline: () => void;
}

const DeclineButton: React.FC<DeclineButtonProps> = ({ targetUserNetID, onDecline}) => {
    // const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUserNetID);
    // const [followStatus, setFollowStatus] = useState(follow_status);

    const handleDecline = async () => {
        const response = await DeclinePendingFriendRequest(targetUserNetID);
        onDecline();
        console.log(response);
    };

    return (
        <div className="follow-request-actions decline" onClick={handleDecline} tabIndex={0} role="button">
            Decline
        </div>
    );
};

export default DeclineButton;