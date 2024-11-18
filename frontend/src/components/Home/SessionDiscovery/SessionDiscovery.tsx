import React, { useEffect, useState } from 'react';
import { GetActiveSessions } from '../../../services/Sessions/GetActiveSessionsService';
import './SessionDiscovery.css';

const SessionDiscovery: React.FC = () => {
interface Session {
    id: string;
    title: string;
    description: string;
    location: string;
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

  return (
    <div className="session-discovery">
      <header className='home-main-active-friends-title'>
                <h1 className='pl-1 text-[20px] font-extrabold'>Discover Sessions</h1>
        </header>
      {sessions.length === 0 ? (
        <p>No active sessions found.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
                <h2 className='text-[18px] font-extrabold'>{session.title}</h2>
                <p>{session.description}</p>
                <p>Location: {session.location}</p>
                <button>Join Session</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionDiscovery;