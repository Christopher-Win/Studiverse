import React, { ReactNode, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import SearchResultsDropdown from './SearchResultsDropdown';

import './SearchBar.css'; // Optional, for styling

interface User {
    netID: string;
    last_name: ReactNode;
    first_name: ReactNode;
    username: string;
    profile_image: string;
  }
  
const SearchBar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<User[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length > 1) { // Start searching after 3 characters 
        try {
            setShowDropdown(true);
            const response = await axios.get(`http://localhost:8000/search/${query}/`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Send cookies with the request
            });
            setResults(response.data);
            console.log('Search results:', results);
        } catch (error) {
             console.error('User not found:', query);
             setResults([]);
        }
        } else {
            setResults([]);
            setShowDropdown(false); // Hide modal if the query is too short
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
        clearSearch();
    };

    const handleFocus = () => {
        if (query.length > 2) {
          setShowDropdown(true);
        }
      };
    
      const handleBlur = () => {
        setTimeout(() => {
          setShowDropdown(false);
        }, 200); // Delay to allow clicks on dropdown items
      };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={handleSearch}
                className="search-input"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />{query && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="clear-button"
                >
                   <i className="fas fa-xs fa-xmark border-4 bg-white rounded-full pt-1 pb-1 border-stone-50"></i> {/* Friends Icon */}
                </button>
            )}
            {showDropdown && (
                <SearchResultsDropdown results={results} onClose={handleCloseDropdown} />
            )}
        </div>
    );
};

export default SearchBar;