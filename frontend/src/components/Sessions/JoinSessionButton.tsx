import React, { useState } from 'react';
import { JoinSession } from '../../services/Sessions/JoinSessionService';
import { useAuth } from '../../Context/AuthContext';

interface JoinSessionButtonProps {
  sessionCode: string; // The unique code for the session
  onJoinSuccess?: () => void; // Callback for successful join (optional)
}

const JoinSessionButton: React.FC<JoinSessionButtonProps> = ({ sessionCode, onJoinSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fetchCurrentSession } = useAuth();

    const handleJoin = async () => {
            setLoading(true);
            setError(null);

            try {
                await JoinSession(sessionCode);
                await fetchCurrentSession(); // Refresh the current session
                setLoading(false);

                if (onJoinSuccess) {
                    onJoinSuccess(); // Trigger callback if provided
                }
            } catch (err: any) {
                setLoading(false);
                setError(err.response?.data?.error || 'Failed to join session. Please try again.');
            }
    };

    return (
        <>
            <button
                onClick={handleJoin}
                disabled={loading}
                className="join-session-button"
            >
                {loading ? 'Joining...' : 'Join'}
            </button>
            {error && <p className="error-text">{error}</p>}
        </>
    );
};

export default JoinSessionButton;