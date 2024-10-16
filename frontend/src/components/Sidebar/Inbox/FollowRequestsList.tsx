import React, { ReactNode } from 'react';
import './FollowRequestsList.css';
import ConfirmButton from './ConfirmButton';
import DeclineButton from './DeclineButton';
interface User {
  last_name: ReactNode;
  first_name: ReactNode;
  netID: string;
  username: string;
  profile_image: string;
}

interface FollowRequestsListProps {
  results: User[];
  onAction: () => void;
}

const FollowRequestsList: React.FC<FollowRequestsListProps> = ({ results, onAction }) => {
    
  return (
    
    <>
        {results.map((user) => (
            <div className='follow-request'>
               
                    <div className="search-result-item-contents">
                        <section className="search-result-item-content-left">
                            <div className="profile-pic-box">
                                <img src={user.profile_image} alt={user.username} className="profile-img" />
                            </div>
                        </section>
                        
                        <div className="follow-request-names">
                                <a key={user.username} href={`/${user.username}`} className='follow-request-username'>
                                    <span>{user.username}</span>
                                </a>
                                <div className='follow-request-fullname'>
                                    <span>{`${user.first_name} ${user.last_name}`}</span>
                                </div>
                               
                        </div>
                        
                        <div className="follow-request-actions">
                            <ConfirmButton targetUserNetID={user.netID} onConfirm={onAction}/> {/* </ConfirmButton.tsx> */}
                            <DeclineButton targetUserNetID={user.netID} onDecline={onAction}/> {/* </DeclineButton.tsx> */}
                        </div>
                        

                    </div>
                
            </div>
        ))}
   </>
  );
};

export default FollowRequestsList;