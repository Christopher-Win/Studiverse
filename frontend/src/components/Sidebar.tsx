import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col">
      <nav>
        <ul className="space-y-4">
          <li>
            <a href="/sessions" className="text-lg hover:text-purple-400">My Sessions</a>
          </li>
          <li>
            <a href="/friends" className="text-lg hover:text-purple-400">Friends</a>
          </li>
          <li>
            <a href="/calendar" className="text-lg hover:text-purple-400">Calendar</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;