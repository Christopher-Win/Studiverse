import React, { useEffect, useState } from 'react';
import { GetRecentActivity } from '../../../services/Sessions/GetRecentActivityService';
import './RecentActivity.css';
import { Home, LogIn, LogOut, Clock } from 'lucide-react'; // Icons library

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
        <div className="space-y-4">
          <h2 className="text-white text-xl font-semibold">Recent Activity</h2>
          <div className="h-[400px] rounded-lg border border-gray-700 bg-gray-800/50 p-4 overflow-auto">
            <div className="space-y-4">
              {recentSessions.length > 0 ? (
                recentSessions.map((session, index) => (
                  <div
                    key={session.session_code}
                    className="bg-gray-700 relative overflow-hidden transition-all hover:ring-2 hover:ring-purple-600 rounded-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-transparent" />
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="text-white font-medium">{session.title}</h3>
                          <p className="text-sm text-gray-400">{session.description}</p>
                        </div>
                        <span className="rounded-full bg-purple-600/20 px-2 py-1 text-xs font-medium text-purple-300">
                          {session.history?.duration ? `${session.history.duration} minutes` : (!session.history.left_at ? 'Ongoing' : '< 1 minute')}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          <span>Location: {session.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <LogIn className="h-4 w-4" />
                          <span>
                            Joined: {session.history?.joined_at ? new Date(session.history.joined_at).toLocaleString() : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          <span>
                            Left:{' '}
                            {session.history?.left_at
                              ? new Date(session.history.left_at).toLocaleString()
                              : 'Still in session'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {session.history?.duration ? `${session.history.duration} minutes` : '< 1 minute'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No recent activity found.</p>
              )}
            </div>
          </div>
        </div>
      );
    };