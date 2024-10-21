import { useAuth } from '../../../Context/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../index.css';
import { GetCurrentSession } from '../../../services/Sessions/GetCurrentSessionService';

interface Session {title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    session_size: number;
}
const CurrentSession: React.FC = () => {
    const [currentSession, setCurrentSession] = useState<Session | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8000/session/')  // Fetch the current session data
            .then(response => setCurrentSession(response.data))
            .catch(error => console.error("Error fetching session data:", error));
    }, []);

    return (
        <>
            {currentSession?.title ? 
            (<section className='home-main-current-session'>
                <header className='home-main-current-session-title'>
                    <h1 className='pr-1 text-[20px] font-extrabold'>Current Session:</h1>
                    <h2 className='mt-[1.5px] text-[18px]'>{currentSession?.title}</h2>
                    
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