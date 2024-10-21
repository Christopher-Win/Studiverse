import { useAuth } from '../../../Context/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../index.css';
import { GetCurrentSession } from '../../../services/Sessions/GetCurrentSessionService';
import SessionClock from '../../../components/Sessions/SessionClock';

export interface Session {title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    session_size: number;
}
const CurrentSession: React.FC = () => {
    const [currentSession, setCurrentSession] = useState<any | null>(null);
    const userAuthData = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setCurrentSession(userAuthData.userData?.currentSession); // Set the current session from the user data
        setLoading(false);
    }, []);
    if (loading) {
        return <p>Loading session...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            {currentSession?.title ? 
            (<section className='home-main-current-session'>
                <header className='home-main-current-session-title'>
                    <h1 className='pr-1 text-[20px] font-extrabold'>Current Session:</h1>
                    <h2 className='mt-[1.5px] text-[18px]'>{currentSession?.title}</h2>
                    <SessionClock sessionId={''}/>
                </header>
                <header className='home-main-current-session-location'>
                    <h1 className='pr-1'>Location:</h1>
                    <h2>{currentSession?.location}</h2>
                </header>
            </section>) :
            (<section className='home-main-current-session'>
                <header className='home-main-current-session-title'>
                    <h1 className='pr-1 text-[20px] font-extrabold'>No Current Session</h1>
                </header>
            </section>)
            }
        </>
    );
};

export default CurrentSession;