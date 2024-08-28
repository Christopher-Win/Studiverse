import React from 'react'
import Button from './Button'
// import useLogoutService from '../services/LogoutService'
import { useNavigate } from 'react-router-dom'
import '../index.css'

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  };

const LogoutButton: React.FC = () => {
    const navigate = useNavigate(); 
    
    const handleLogout = () => {  
        // Clear cookies
        deleteCookie('token');
        // Redirect to the sign-in page
        navigate('/signin');
    }
    
  return (
    <>
        <button onClick={handleLogout} className="home-header-button">
            Logout
        </button>
    </>
  )
}

export default LogoutButton


