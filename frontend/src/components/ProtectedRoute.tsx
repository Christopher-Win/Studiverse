import React,{useEffect,useState } from 'react';
import { Route, Navigate, Outlet, useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import {getCookie} from '../Context/AuthContext'

interface UserData {
    netID: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;  // Image URL or null
    friends: UserData[];  // List of friends, who are also User instances
    is_active: boolean;
    is_staff: boolean;
    date_joined: string;  // Date in string format
}

const ProtectedRoute: React.FC = () => {
    const { userData } = useAuth();
    const token = getCookie('token');

    // Only try to load the protected route if the user is logged in
    if (token && userData === null) {
        // Loading state, you can show a spinner or a loading message here
        return <div>Loading...</div>;
    }
    return userData ? <Outlet /> : <Navigate to="/signin" />;
};


export default ProtectedRoute;