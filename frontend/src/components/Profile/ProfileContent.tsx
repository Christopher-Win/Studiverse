// ProfileContent.tsx
import React from 'react';
import './Profile.css';
interface UserProfileData {
    username: string;
    first_name: string;
    last_name: string;
    bio: string;
    profile_picture: string;
  }

const ProfileContent: React.FC<{ userData: UserProfileData }> = ({ userData }) => {
  return (
    <div className="profile-content">
      {/* Add content sections here, such as user's posts, activity, etc. */}
      <h3>Recent Activity</h3>
      {/* Placeholder content, replace with actual data */}
      <p>No recent activity yet.</p>
    </div>
  );
};

export default ProfileContent;