import React, { useEffect, useState } from 'react';
import { GetRecentActivity } from '../../../services/Sessions/GetRecentActivityService';
import './RecentActivity.css';
// import '../../../index.css'
interface Session {
  history: any;
  session_code: string;
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
}

export const RecentActivity: React.FC = () => {
    const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  
    useEffect(() => {
      GetRecentActivity()
        .then((sessions) => setRecentSessions(sessions))
        .catch(() => console.error('Failed to fetch recent activity'));
    }, []);
  
    return (
      <section className="home-main-stats">
            <header className='home-main-stats-title'>
                <h1 className='pl-1 text-[20px] font-extrabold'>Recent Activity</h1>
            </header>

            <main className='home-main-stats-content'>
                
                    {recentSessions.map((session, index) => (
                        <li key={session.session_code} className={`stat${index + 1}`}>
                            <div>
                                <h3>{session.title}</h3>
                                <p>{session.description}</p>
                                <p>Location: {session.location}</p>
                                <p>
                                    Joined: {new Date(session.history?.joined_at).toLocaleString()} <br />
                                    Left: {session.history?.left_at ? new Date(session.history?.left_at).toLocaleString() : 'Still in session'} <br />
                                    Duration: {session.history?.duration ? `${session.history.duration} minutes` : '0 minutes'}
                                </p>
                            </div>
                        </li>
                    ))}
                
            </main>
      </section>
    );
  };