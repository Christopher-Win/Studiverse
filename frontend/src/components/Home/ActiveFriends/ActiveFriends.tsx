import React, { useEffect, useState } from 'react';
import '../../../index.css'
import './ActiveFriends.css';
import { useAuth } from '../../../Context/AuthContext';
import { getActiveFriends } from '../../../services/Friendships/FriendshipsService';

interface Session {
    title: string;
    session_code: string;
    description: string;
    start_time: string;
    end_time: string;
    created_by: string;
    location: string;
    session_size: number;
    is_private: boolean;
    users: string[];
    participants: string[];
  }
  
interface Friend {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    is_active: boolean;
    friends: string[]; // Array of usernames
    sessions: Session[];
    current_session: Session | null;
    profile_image: string; // Optional field if you have avatars
}

const ActiveFriends: React.FC = () => {
    const { userData } = useAuth();
    const [activeFriends, setActiveFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
  
    useEffect(() => {
      const fetchActiveFriends = async () => {
        try {
          const friends = await getActiveFriends();
          setActiveFriends(friends);
        } catch (error) {
          setError('Failed to load active friends.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchActiveFriends();
    }, []);
    return (
        <section className='home-main-active-friends'>

            <header className='home-main-active-friends-title'>
                <h1 className='pl-1 text-[20px] font-extrabold'>Active Friends</h1>
            </header>

            <section className='home-main-active-friends-content'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                <p className='text-red-500'>{error}</p>
                ) : activeFriends.length > 0 ? (
                       
                            activeFriends.map(friend => (
                                // <div key={friend.username} className='friend-item flex items-center p-2'>
                                //     <img src={friend.profile_image} alt={friend.username} className="profile-img" />
                                // <div>
                                //     <p className='font-semibold'>
                                //     {friend.first_name} {friend.last_name}
                                //     </p>
                                //     {/* Optionally display additional info, like current session */}
                                //     {friend.current_session && (
                                //     <p className='text-sm text-gray-500'>
                                //         In session: {friend.sessions[0].title}
                                //     </p>
                                //     )}
                                // </div>
                                // </div>
                                    <div className='active-friends-container'>
                                        <div className="search-result-item">
                                            <div className="search-result-item-contents">
                                                <section className="search-result-item-content-left">
                                                    <div className="profile-pic-box">
                                                        <img src={friend.profile_image} alt={friend.username} className="profile-img" />
                                                    </div>
                                                </section>

                                                <section className="search-result-item-content-right">
                                                    <div className="search-result-item-content-right-inner">
                                                        <span className="user-username">{friend.username}</span>
                                                        {/* <span className="user-social-context">{friend.first_name} {friend.last_name}</span> */}
                                                        <span className="user-social-context">Currently in {friend.sessions[0].title}</span>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                            ))
                        
                    ) 
                : (
                    <p className='text-gray-500'>No active friends online.</p>
                )}
            </section>

        </section>
    )
}

export default ActiveFriends
