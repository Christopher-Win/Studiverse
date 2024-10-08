import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is a reusable component
import ProfileHeader from '../components/Profile/ProfileHeader'; // New component for the profile header
import ProfileContent from '../components/Profile/ProfileContent'; // New component for profile-specific content
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {getCookie} from '../components/AuthContext';

interface UserData {
    username: string;
    first_name: string;
    last_name: string;
    bio?: string;
    profile_image?: string;
    follow_status?: string;
  // Add other fields as necessary
}

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserData | null>(null);
  const [viewer, setViewer] = useState<UserData | null>(null); // State to hold the current logged-in user

  useEffect(() => {
    const fetchUserData = async () => { // Fetch user data based on the username from the URL
        const token = getCookie('token');
        if (token) {
        try {
            const response = await axios.get(`http://localhost:8000/${username}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
             withCredentials: true, // Send cookies with the request
            });
            setProfile(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setProfile(null);
        }
        } else {
            setProfile(null);
        }
    };
    const fetchCurrentUser = async () => {
        const token = getCookie('token');
        try{
            const response = await axios.get(`http://localhost:8000/accounts/profile/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Send cookies with the request
            });
            setViewer(response.data); // Set the current logged-in user
            console.log(response.data);
        }
        catch (error) {
            console.error('Failed to fetch user data:', error);
            setViewer(null);
        }
    }
    fetchCurrentUser();
    console.log("Viewer: ", viewer);
    fetchUserData();
  }, [username]);

  return (
    <div className="profile-page-container">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="profile-page-main-content">
            {profile ? (
            <section className="main-content-inner">
                <main className="main-content-inner-main">
                    <div className='main-content-inner-main-inside'>
                        <header className='profile-header'>
                            {viewer && <ProfileHeader profile={profile} viewer={viewer} />} 
                        </header>
                        {/* <ProfileContent userData={userData} /> */}
                    </div>
                </main>
            </section>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    </div>
  );
};

export default Profile;