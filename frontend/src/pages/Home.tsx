import { useAuth } from '../Context/AuthContext';
import '../index.css'

import React, { useState } from 'react';
import HomeHeader from '../components/Home/HomeHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import { useSidebar } from '../Context/SidebarContext';
import Header from '../components/Home/Main/Header';
import CurrentSession from '../components/Home/Main/CurrentSession';
import ActiveFriends from '../components/Home/ActiveFriends/ActiveFriends';
import SessionDiscovery from '../components/Home/SessionDiscovery/SessionDiscovery';
import { RecentActivity } from '../components/Home/Main/RecentActivity';

// import SearchBar from '../components/SearchBar';
// import MySessions from './MySessions';
// import UpcomingSessions from '../components/UpcomingSessions';
// import StudyHoursChart from '../components//StudyHoursChart';
// import CalendarWidget from '../components/CalendarWidget';
// import NewSessionButton from '../components/NewSessionButton';

const Home: React.FC = () => {
    // const [sidebarOpen, setSidebarOpen] = useState(false);
    const { sidebarOpen, toggleSidebar } = useSidebar();
    
    // const toggleSidebar = () => {   
    //     setSidebarOpen(!sidebarOpen);
    // }

  return (
    <div className="home-container">
      {/* Header Component */}
        <header className='home-header'>
            <HomeHeader />
        </header>

        {/* Sidebar Component */}
        <aside className={`sidebar ${sidebarOpen ? 'selected':''}`}>
            <Sidebar toggleSidebar={toggleSidebar}/>
        </aside>
        

        {/* Main Content Section */}
        {/* THE MAIN GRID AREA HAS 3 ROWS: HEADER - ACTIVE FRIENDS - STATS CHART */}
        <main className="home-main">
            <Header />
            <CurrentSession />
            <ActiveFriends />
            <RecentActivity />
        </main>

        <aside className="home-schedule">
            <SessionDiscovery />
            <p>Calendar</p>
        </aside>


    </div>
  );
};

export default Home;