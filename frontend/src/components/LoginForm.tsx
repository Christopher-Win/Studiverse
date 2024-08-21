import React, { useState } from 'react';
import InputField from './InputField'; // Reusing the InputField component
import {loginUser} from '../services/LoginService'; // Import the loginUser function from the LoginService
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [netID, setNetID] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // useNavigate hook

    const resetForm = () => {
        setNetID('');
        setPassword('');
    }

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Logging in with', { netID, password });
        setError(null); // Reset error state before submission
        try {
            await loginUser({ netID, password });
            navigate('/home');


        } catch (error) {
            setError('Login failed. Please try again.');
            resetForm();
        }
    
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <InputField 
                id="netid" 
                label="NetID" 
                type="text" 
                placeholder="NetID" 
                value={netID}
                onChange={(e) => setNetID(e.target.value)}
            />
            <InputField 
                id="password" 
                label="Password" 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Login</button>
        </form>
    );
};

export default LoginForm;