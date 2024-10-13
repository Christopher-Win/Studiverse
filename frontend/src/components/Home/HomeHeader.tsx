import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import LogoutButton from '../LogoutButton';
import SearchBar from '../SearchBar';
// import 'frontend/src/HomeHeader.css'; // Make sure to create corresponding CSS file for styling
interface User {
    id: string;
    username: string;
    profileImage: string;
}

  
const HomeHeader: React.FC = () => {
    const { userData } = useAuth();

    return (
        <>
            <SearchBar/>
            <LogoutButton />
            
        </>
    );
};

export default HomeHeader;