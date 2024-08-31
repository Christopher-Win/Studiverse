// ProfileHeader.tsx
import React, { ReactNode, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { FileRejection, useDropzone } from 'react-dropzone';

interface UserProfileData {
  username: ReactNode;
  first_name: ReactNode;
  last_name: ReactNode;
    bio?: string;
  profile_image?: string;
}

const ProfileHeader: React.FC<{ userData: UserProfileData }> = ({ userData }) => {
    const [profileImage, setProfileImage] = useState<string>(userData.profile_image || '/path/to/default/avatar.png');
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
                    'Content-Type': 'multipart/form-data',
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

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
        <>
            <section className="profile-image" {...getRootProps()}>
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
                            {userData.username}
                        </div>
                    </div>
                </div>
            </section>
        <h1>{userData.first_name} {userData.last_name}</h1>
        {/* <p>{userData.bio}</p> */}
        </>
  );
};

export default ProfileHeader;