import React from 'react'
import '../../../index.css'
import { useAuth } from '../../Context/AuthContext';

const ActiveFriends: React.FC = () => {
    const { userData } = useAuth();

    return (
        <section className='home-main-active-friends'>
        <header className='home-main-active-friends-title'>
            <h1 className='pl-1 text-[20px] font-extrabold'>Active Friends</h1>
        </header>
        <section className='home-main-active-friends-content'>

        </section>
    </section>
    )
}

export default ActiveFriends
