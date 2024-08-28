import { useAuth } from '../components/AuthContext';
import '../index.css'

import React from 'react';
import HomeHeader from '../components/HomeHeader';
import Sidebar from '../components/Sidebar';
import Header from '../components/Home/Main/Header';
import CurrentSession from '../components/Home/Main/CurrentSession';
import ActiveFriends from '../components/Home/Main/ActiveFriends';

// import SearchBar from '../components/SearchBar';
// import MySessions from './MySessions';
// import UpcomingSessions from '../components/UpcomingSessions';
// import StudyHoursChart from '../components//StudyHoursChart';
// import CalendarWidget from '../components/CalendarWidget';
// import NewSessionButton from '../components/NewSessionButton';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Header Component */}
        <header className='home-header'>
            <HomeHeader />
        </header>

        {/* Sidebar Component */}
        <aside className='sidebar'>
            <Sidebar />
        </aside>
        

        {/* Main Content Section */}
        {/* THE MAIN GRID AREA HAS 3 ROWS: HEADER - ACTIVE FRIENDS - STATS CHART */}
        <main className="home-main">
            <Header />
            <CurrentSession />
            <ActiveFriends />
        </main>

        <aside className="home-schedule">
            <p>Calendar</p>
        </aside>
    </div>
  );
};

export default Home;