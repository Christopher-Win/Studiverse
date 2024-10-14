import React, { ReactNode } from 'react';
import './FollowRequestsList.css';

interface User {
  last_name: ReactNode;
  first_name: ReactNode;
  netID: string;
  username: string;
  profile_image: string;
}

interface FollowRequestsListProps {
  results: User[];
  onClose?: () => void;
}

const FollowRequestsList: React.FC<FollowRequestsListProps> = ({ results, onClose }) => {
    
  return (
    
    <>
        {results.map((user) => (
            <div className='follow-request'>
                <a key={user.username} href={`/${user.username}`} className="" onClick={onClose}>
                    <div className="search-result-item-contents">
                        <section className="search-result-item-content-left">
                            <div className="profile-pic-box">
                                <img src={user.profile_image} alt={user.username} className="profile-img" />
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
            </div>
        ))}
   </>
  );
};

export default FollowRequestsList;