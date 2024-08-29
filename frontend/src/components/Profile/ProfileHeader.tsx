// ProfileHeader.tsx
import React, { ReactNode, useState } from 'react';
import './Profile.css';

interface UserProfileData {
  username: ReactNode;
  first_name: ReactNode;
  last_name: ReactNode;
//   bio: string;
  profile_picture: string;
}

const ProfileHeader: React.FC<{ userData: UserProfileData }> = ({ userData }) => {
  return (
    <div className="profile-header">
      <img
        src={userData.profile_picture || '/default-profile.png'}
        alt={`${userData.username}'s profile`}
        className="profile-picture"
      />
      <h1>{userData.first_name} {userData.last_name}</h1>
      <h2>@{userData.username}</h2>
      {/* <p>{userData.bio}</p> */}
    </div>
  );
};

export default ProfileHeader;