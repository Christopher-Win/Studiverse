import React from 'react'

interface Session {
    id: number;
    title: string;
    description: string;
}

// Props for the MainContent component
interface SessionProps {
    sessions: Session[];
}

const SessionsPreview: React.FC<SessionProps> = () => {
  return (
    <article className="mb-6">
        <h2 className="text-xl font-semibold">My sessions</h2>
        
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.id} className="mt-4 p-4 bg-gray-700 rounded-md">
              <p className="text-lg">{session.title}</p>
              <p className="text-gray-400">{session.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No active sessions.</p>
        )}

        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          View Session
        </button>
      </article>
  )
}

export default SessionsPreview
 
    
    