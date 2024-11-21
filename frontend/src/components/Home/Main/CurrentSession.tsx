import { useAuth } from '../../../Context/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../index.css';
import SessionClock from '../../../components/Sessions/SessionClock';
import LeaveSessionButton from '../../Sessions/LeaveSessionButton';

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "../../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Home, LogOut } from 'lucide-react';

export interface Session {
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    session_size: number;
}const CurrentSession: React.FC = () => {
    const { currentSession, fetchCurrentSession } = useAuth(); // Get the current session from the AuthContext
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetchCurrentSession();
      setLoading(false);
    }, []);
  
    const handleLeaveSession = () => {
      console.log('Leaving session');
      // Add logic to leave the session here
    };
  
    if (loading) {
      return <p>Loading session...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    
  return (
    <>
      <div className="home-main-current-session">
        {currentSession ? (
          <Card className="bg-black text-gray-200 shadow-md rounded-xl">
            <CardHeader className="pb-2 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-100">Current Session</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-200" onClick={handleLeaveSession}>
                  <LogOut className="h-3 w-3 mr-1" />
                  Exit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-10 w-10 rounded-full items-center flex justify-center bg-slate-700">
                    <AvatarImage src="/placeholder.svg" alt={`${currentSession?.created_by}'s avatar`} />
                    <AvatarFallback className=" text-gray-200 ">
                      {currentSession?.created_by.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-100">{currentSession?.title}</h3>
                    <p className="text-xs text-gray-400">{currentSession?.description || 'No description available'}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <Home className="h-4 w-4 mr-1" />
                  <span>{currentSession?.location || 'Unknown'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Duration</span>
                  <div className="flex items-center text-gray-100">
                    <Clock className="h-4 w-4 mr-1 text-purple-500" />
                    <SessionClock sessionId={currentSession.session_code} />
                  </div>
                </div>
                <Progress
                  value={((new Date().getTime() - new Date(currentSession?.start_time).getTime()) % 3600 / 3600) * 100}
                  className="h-1 bg-gray-700"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-800 text-gray-200 shadow-md rounded-xl">
            <CardHeader className="pb-2 border-b border-gray-700">
              <CardTitle className="text-lg font-bold text-gray-100">No Current Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">You are not currently in a session.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};
  
  export default CurrentSession;