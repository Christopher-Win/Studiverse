import React from 'react'
import '../../../index.css'
import { useAuth } from '../../Context/AuthContext';

const CurrentSession:React.FC = () => {
    const { userData } = useAuth();

    return (
        <section className='home-main-current-session'>
            <header className='home-main-current-session-title'>
                <h1 className='pr-1 text-[20px] font-extrabold'>Current Session:</h1>
                <h2 className='mt-[1.5px] text-[18px]'>Advanced Calculus Study Group</h2>
            </header>
            <header className='home-main-current-session-location'>
                <h1 className='pr-1'>Location:</h1>
                <h2>Central Library, Room 101</h2>
            </header>
        </section>
    )
}

export default CurrentSession
