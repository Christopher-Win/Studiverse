import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility function to delete a cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

// Logout service function
const useLogoutService = () => {
  const navigate = useNavigate();
  const logout = () => {
    // Clear cookies
    deleteCookie('token');
    // Redirect to the sign-in page
    navigate('/signin');
  };

  return logout;
};

export default useLogoutService;