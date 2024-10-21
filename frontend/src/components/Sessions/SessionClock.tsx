import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetCurrentSession } from '../../services/Sessions/GetCurrentSessionService';

const SessionTimer: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Fetch the session start time from the backend
    GetCurrentSession()
      .then(response => {
        const sessionStartTime = new Date(response?.data.start_time);
        setStartTime(sessionStartTime);
      })
      .catch(error => console.error("Error fetching session data:", error));
  }, [sessionId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (startTime) {
      // Start the timer to calculate the elapsed time
      timer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000); // Time in seconds
        setElapsedTime(elapsed-18000);
      }, 1000); // Update every second
    }

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [startTime]);

  // Format the elapsed time into hours, minutes, and seconds
  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div>
      <p>Session Duration: {formatElapsedTime(elapsedTime)}</p>
    </div>
  );
};

export default SessionTimer;