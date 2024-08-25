import React from 'react';
import { Link } from 'react-router-dom';
import H1 from '../components/H1';
import Subheader from '../components/Subheader';
import Image from '../components/Image';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom'
import getCookie from '../services/CSRFService';
import '../index.css'

const WelcomePage: React.FC = () => {

    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    }
    return (
    <div className='min-h-screen container bg-[#161616] text-white'>

        <header className='min-w-full container-header'>
            <H1>Studiverse Hub</H1>
            <Subheader>Organize study sessions and meetups with peers.</Subheader>
        </header>

        <section className='min-w-full container-body'>
            <Image image='https://assets.api.uizard.io/api/cdn/stream/11127f22-9d0b-4ae2-9d39-c169bbcf6256.png'/>
        </section>
        
        <section className='container-actions justify-center'>
            <Button onClick={handleSignup}>Signup</Button>
           
            <div className='text-center flex flex-row justify-center gap-20 pt-8'>
            <p className="">Ready to study?</p>
                <a href="/signin">Sign in</a>
            </div>
        </section>

    </div>
  );
}

export default WelcomePage;