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
      {results.map((user) => (
        <a key={user.username} href={`/accounts/${user.netID}`} className="search-result-item" onClick={onClose}>
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