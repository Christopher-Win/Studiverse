import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';

import { GetCurrentSession } from '../../services/Sessions/GetCurrentSessionService';

const SessionTimer: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Time in seconds
  const [startTime, setStartTime] = useState<DateTime | null>(null);

  useEffect(() => {
    GetCurrentSession()
      .then(response => {
        const rawStartTime = response?.start_time;
        // Parse the start time and set the time zone to CST explicitly
        const sessionStartTime = DateTime.fromISO(rawStartTime).setZone('America/Chicago', { keepLocalTime: true });
        setStartTime(sessionStartTime);
      })
      .catch(error => console.error("Error fetching session data:", error));
  }, [sessionId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (startTime) {
      timer = setInterval(() => {
        // Set the current time to CST to match the start time's time zone
        const currentTime = DateTime.now().setZone('America/Chicago');
        const elapsed = Math.floor(currentTime.diff(startTime).as('seconds'));
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startTime]);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)-6;
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