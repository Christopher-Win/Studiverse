import React, { ReactNode } from 'react';
import './SearchResultsDropdown.css';

interface User {
  last_name: ReactNode;
  first_name: ReactNode;
  netID: string;
  username: string;
  profile_image: string;
}

interface SearchResultsDropdownProps {
  results: User[];
  onClose: () => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({ results, onClose }) => {
  return (
    <section className="search-results-dropdown">
        {results.length>0 && <h1 className='text-zinc-50 font-bold mb-4'>Profiles</h1>}
        
        {results.map((user) => (
            <a key={user.username} href={`/${user.username}`} className="search-result-item" onClick={onClose}>
                <div className="search-result-item-contents">
                    <section className="search-result-item-content-left">
                        <div className="profile-pic-box">
                            <img src={"../../../backend/profile_images/profilepic.jpg"} alt={user.username} className="profile-img" />
                        </div>
                    </section>
                    <section className="search-result-item-content-right">
                        <div className="search-result-item-content-right-inner">
                            <span className="user-username">{user.username}</span>
                            <span className="user-social-context">{user.first_name} {user.last_name}</span>
                        </div>
                    </section>

                </div>
            </a>
        ))}
    </section>
  );
};

export default SearchResultsDropdown;