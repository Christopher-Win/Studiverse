import React from 'react'
import {useState, useEffect} from 'react'

import H1 from '../components/H1'
import Subheader from '../components/Subheader'
import ImageDisplay from '../components/ImageDisplay'
import SignupForm from '../components/SignupForm'
import '../index.css'
import { signupUser } from '../services/signupService'
import { Link, useNavigate } from 'react-router-dom'

const SignupPage: React.FC = () => {
    const [netID, setnetID] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleJoin = async (event: React.FormEvent) => {
        event.preventDefault();
        
        setError(null); // Reset error state before submission
        try {
            await signupUser({ netID, email, username, first_name, last_name, password });
            navigate('/signin');
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container min-h-screen">
            <div className="signup-content pb-5">
                <ImageDisplay src="../src/assets/SignupPageIcon.png" alt="Studiverse" />
                <H1>Studiverse</H1>
                <p>Join Studiverse to get started</p>
                <SignupForm 
                    netID={netID}
                    email={email}
                    username={username}
                    first_name={first_name}
                    last_name={last_name}
                    password={password}
                    setnetID={setnetID}
                    setEmail={setEmail}
                    setUsername={setUsername}
                    setfirst_name={setfirst_name}
                    setlast_name={setlast_name}
                    setPassword={setPassword}
                    handleJoin={handleJoin}
                />
            </div>
            <footer className='flex flex-row text-center gap-2'>
                    <p>Already have an account?</p>
                    <a href="/signin" className='text-blue-500'>Sign in here.</a>
            </footer>        
        </div>
    );
}

export default SignupPage;
