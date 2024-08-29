import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is a reusable component
import ProfileHeader from '../components/Profile/ProfileHeader'; // New component for the profile header
import ProfileContent from '../components/Profile/ProfileContent'; // New component for profile-specific content
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {getCookie} from '../components/AuthContext';

interface UserProfileData {
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  profile_picture: string;
  // Add other fields as necessary
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [userData, setUserData] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        const token = getCookie('token');
        if (token) {
            try {
                console.log(username);
                const response = await axios.get(`http://localhost:8000/${username}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="profile-page-container">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="profile-main-content">
            {userData ? (
            <>
                <ProfileHeader userData={userData} />
                <ProfileContent userData={userData} />
            </>
            ) : (
            <div>Loading...</div>
            )}
        </div>
    </div>
  );
};

export default Profile;