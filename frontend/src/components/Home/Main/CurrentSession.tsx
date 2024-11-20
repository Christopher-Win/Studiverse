import { useAuth } from '../../../Context/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../index.css';
import SessionClock from '../../../components/Sessions/SessionClock';
import LeaveSessionButton from '../../Sessions/LeaveSessionButton';

export interface Session {
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    session_size: number;
}
const CurrentSession: React.FC = () => {
    // const [currentSession, setCurrentSession] = useState<any | null>(null);
    const {currentSession, fetchCurrentSession} = useAuth(); // Get the current session from the AuthContext
    const userAuthData = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCurrentSession(); // Fetch the current session by using the fetchCurrentSession function from the AuthContext
        setLoading(false);
    }, []);  // This effect runs when the fetchCurrentSession function changes 

    console.log("Current Session", currentSession);

    if (loading) {
        return <p>Loading session...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            {currentSession ? (
                <section className='home-main-current-session'>
                    <header className='home-main-current-session-title'>
                        <h1 className='pr-1 text-[20px] font-extrabold'>Current Session:</h1>
                        <h2 className='mt-[1.5px] text-[18px]'>{currentSession?.title}</h2>
                        <SessionClock sessionId={currentSession.session_code}/>
                    </header>
                    
                    <header className='home-main-current-session-location'>
                        <h1 className='pr-1'>Location:</h1>
                        <h2>{currentSession?.location}</h2>
                    </header>
                </section>
            ) : (
                <section className='home-main-current-session'>
                    <header className='home-main-current-session-title'>
                        <h1 className='pr-1 text-[20px] font-extrabold'>No Current Session</h1>
                    </header>
                </section>
            )}
        </>
    );
};

export default CurrentSession;