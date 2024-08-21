import React from 'react';
import { Route, Navigate, Outlet} from 'react-router-dom';


// Helper function to get a cookie by name
const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log('Get cookie called!');
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};
const fetchUserData = async () => {
    const token = getCookie('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/ctn200003', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Invalid or expired token');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
        setUser(null);
        // Redirect to login if token is invalid
        navigate('/signin');
      }
    }
  };

const ProtectedRoute: React.FC = () => {
    // Check if the user is logged in by checking for the presence of the token in cookies
    const token = getCookie('token');
    console.log('Token:', token);
    // If the user is logged in, render the protected route
    // Otherwise, redirect to the login page
    return token ? <Outlet /> : <Navigate to="/signin" />;
};


export default ProtectedRoute;