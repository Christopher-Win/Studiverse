import React from 'react';
import LoginHeader from '../components/LoginHeader';
import LoginForm from '../components/LoginForm';
import '../Login.css'; // External CSS for styling

const Login: React.FC = () => {
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