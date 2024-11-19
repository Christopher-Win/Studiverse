import React, { useState } from 'react';
import './Sessions.css';
import { LeaveSession } from '../../services/Sessions/LeaveSessionService';
import { useAuth } from '../../Context/AuthContext';
interface LeaveSessionButtonProps {
    onLeaveSuccess?: () => void; // Callback for successful Leave (optional)
}

const LeaveSessionButton: React.FC<LeaveSessionButtonProps> = ({onLeaveSuccess}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fetchCurrentSession } = useAuth();

    const handleLeave = async () => {
            setLoading(true);
            setError(null);

            try {
                await LeaveSession();
                await fetchCurrentSession(); // Refresh the current session
                setLoading(false);

                if (onLeaveSuccess) {
                    onLeaveSuccess(); // Trigger callback if provided
                }
            } catch (err: any) {
                setLoading(false);
                setError(err.response?.data?.error || 'Failed to Leave session. Please try again.');
            }
    };

    return (
        <>
            <button
                onClick={handleLeave}
                disabled={loading}
                className="button leave"
            >
                {loading ? 'Leaving...' : 'Exit Session'}
            </button>
            {error && <p className="error-text">{error}</p>}
        </>
    );
};

export default LeaveSessionButton;