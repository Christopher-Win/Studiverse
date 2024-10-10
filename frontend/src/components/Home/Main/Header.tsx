import React from 'react'
import '../../../index.css'
import { useAuth } from '../../Context/AuthContext';

const Header:React.FC = () => {
    const { userData } = useAuth();

    return (
        <header className='home-main-header'>
            <section className='home-main-header-welcome'>
                <h2>Good morning, {userData?.first_name}!</h2>
                <p>Explore your progress and learning journey</p>
            </section>
            <button className='home-main-header-button'>+ New Session</button>
        </header>
    )
}

export default Header
