import React, {ReactNode, useState } from 'react';
import axios from 'axios';
// import '../../../Profile/Profile.css';
import { useAuth } from '../../../Context/AuthContext';
import { getCookie } from '../../../Context/AuthContext';
import { confirmPendingFriendRequests } from '../../../services/ConfirmFollowRequestService';
import { on } from 'events';

interface ConfirmButtonProps {
    targetUserNetID: string;
    getFollowStatus?: (followStatus: string) => void;
    onConfirm: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ targetUserNetID, onConfirm}) => {
    // const [currentUser, setCurrentUser] = useState(user);
    const [currentTargetUser, setCurrentTargetUser] = useState(targetUserNetID);
    // const [followStatus, setFollowStatus] = useState(follow_status);

    const handleConfirm = async () => {
        const response = await confirmPendingFriendRequests(targetUserNetID);
        onConfirm();
        console.log(response);
    };

    return (
        <div className="follow-request-actions accept" onClick={handleConfirm} tabIndex={0} role="button">
            Confirm
        </div>
    );
};

export default ConfirmButton;