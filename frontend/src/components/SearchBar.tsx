import React from 'react';
import { useAuth } from '../components/AuthContext';

const SearchBar: React.FC = () => {
    const { userData } = useAuth();

  return (
    <header className="p-4 bg-gray-800 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Good morning, {userData?.username}</h1>
      <input
        type="text"
        placeholder="Search study sessions, meetups, and peers"
        className="ml-4 p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 w-full max-w-lg"
      />
      <button className="ml-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
        + New session
      </button>
    </header>
  );
};

export default SearchBar;