import React, { useEffect, useState } from 'react';
import { GetActiveSessions } from '../../../services/Sessions/GetActiveSessionsService';
import './SessionDiscovery.css';
import SessionDuration from '../../Sessions/SessionDuration';

const SessionDiscovery: React.FC = () => {
    interface Session {
        id: string;
        title: string;
        description: string;
        location: string;
        session_occupancy: number;
        session_size: number;
        start_time: string;
        end_time: string;
    }

    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        GetActiveSessions()
        .then((data) => {
            setSessions(data);
            setLoading(false);
        })
        .catch((error) => {
            setError("Failed to fetch active sessions");
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading sessions...</p>;
    if (error) return <p>{error}</p>;

    const handleJoin = async () => {
        // Handle join session

    };

    return (
        <div className="session-discovery">
            <header className='home-main-active-friends-title'>
                <h1 className='pl-1 pb-[20px] text-[20px] font-extrabold'>Discover Sessions</h1>
            </header>
        {sessions.length === 0 ? (
            <p>No active sessions found.</p>
        ) : (
            <ul>
                {sessions.map((session) => (
                    <li key={session.id}>
                        <div className='session-grid'>
                            <div className="title">
                                <span className="session-info">
                                    <p className='text-[18px] font-extrabold inline'>{session.title}</p>
                                    <div className="session-occupancy">
                                        <i className="fa-solid fa-user" /> {session.session_occupancy}/{session.session_size}
                                    </div>
                                </span>
                                <h1 className='text-neutral-500'>{session.description}</h1>
                            </div>

                            <div className='details text-neutral-500'>
                                
                                <p>Location: {session.location}</p>
                                <SessionDuration start_time={session.start_time}/>

                            </div>

                            <div className='button'>
                                <button className='btn btn-primary' onClick={handleJoin}>Join</button> 
                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default SessionDiscovery;