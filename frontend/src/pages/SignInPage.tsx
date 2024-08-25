import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import '../Login.css'; // External CSS for styling
import { getCookie } from '../components/AuthContext';
const Login: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('token'); // Check if logged in
        if(token){
            navigate('/home');
        }
    }, []);
    
    return (
        <div className="login-container">
            <LoginHeader />
            <div className="login-content">
                <h1 className='text-5xl pb-5 font-medium font-sans'>Login</h1>
                <LoginForm />
                <footer className='flex flex-col text-center gap-2'>
                    <a href="/signup" className='text-blue-500'>Don't have an account? Sign up here.</a>
                    <a href="/forgot-password" className=' text-white text-opacity-70 font-light'>Forgot your password?</a>
                </footer>
            </div>
        </div>
    );
};

export default Login;