import React from 'react';
import { DateTime } from 'luxon';

interface SessionDurationProps {
  start_time: string; // ISO string for session start time
}

const SessionDuration: React.FC<SessionDurationProps> = ({ start_time }) => {
  // Parse the start time
  const startTime = DateTime.fromISO(start_time).setZone('America/Chicago');

  // Get the current time
  const now = DateTime.now().setZone('America/Chicago');

  // Calculate the duration in seconds
  const durationInSeconds = Math.floor(now.diff(startTime).as('seconds'));

  // Format the duration
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)-6;
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <p className="session-duration">
      Duration: {formatDuration(durationInSeconds)}
    </p>
  );
};

export default SessionDuration;