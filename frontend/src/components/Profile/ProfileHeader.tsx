// ProfileHeader.tsx
import React, { ReactNode, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { FileRejection, useDropzone } from 'react-dropzone';
import { getCookie } from '../../components/AuthContext';
import FollowButton from './FollowButton';
import FollowingButton from './FollowingButton';
export interface ProfileHeaderProps {
    profile:{
        username: string;
        first_name: string;
        last_name: string;
        bio?: string;
        profile_image?: string;
        isFollowing?: boolean;
    }
    viewer: {
        username: string;
    }
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, viewer}) => {
    const [profileImage, setProfileImage] = useState<string>(profile.profile_image || '/path/to/default/avatar.png');
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setIsUploading(true);

            // Preview the image
            const previewUrl = URL.createObjectURL(file);
            setProfileImage(previewUrl);

            // Create FormData to send file to the server
            const formData = new FormData();
            formData.append('file', file);

            // Upload the image to the backend
            axios.post<{ imageUrl: string }>('http://localhost:8000/uploadProfileImage/', formData, {
                headers: {
                    'Authorization': `Token ${getCookie('token')}`,
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                withCredentials: true, // Send cookies with the request
            }).then(response => {
                console.log(response)
                setProfileImage(response.data.imageUrl);                
                setIsUploading(false);
            }).catch(error => {
                console.error('Error uploading image:', error);
                setIsUploading(false);
            });
        }
    };
    const isProfileOwner = profile.username === viewer.username; 
    const { getRootProps, getInputProps } = useDropzone({ onDrop }); // This will create a dropzone area where you can drop files

  return (
        <>
            <section className="profile-image" {...(isProfileOwner ? getRootProps() : {})}>
                <div className="profile-image-box">
                    <input {...getInputProps()} />
                    <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="profile-image-img" 
                        style={{ cursor: 'pointer', opacity: isUploading ? 0.5 : 1 }}
                    />
                    {isUploading && <p>Uploading...</p>}
                </div>
                
            </section>
            <section className="profile-1">
                <div>
                    <div className="profile-1-box">
                        <div className="profile-1-username">
                            {profile.username}
                        </div>
                        {!isProfileOwner &&
                            (profile.isFollowing ? 
                                <FollowingButton user={viewer.username} targetUser={profile.username} following={true}/> 
                            :   <div className="profile-follow-button">
                                    <FollowButton user={viewer.username} following={false} targetUser={profile.username} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        <h1>{profile.first_name} {profile.last_name}</h1>
        {/* <p>{userData.bio}</p> */}
        </>
  );
};

export default ProfileHeader;