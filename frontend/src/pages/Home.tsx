import { useAuth } from '../components/AuthContext';

import React from 'react';
import HomeHeader from '../components/HomeHeader';
// import Sidebar from '../components/Sidebar';
// import SearchBar from '../components/SearchBar';
// import MySessions from './MySessions';
// import UpcomingSessions from '../components/UpcomingSessions';
// import StudyHoursChart from '../components//StudyHoursChart';
// import CalendarWidget from '../components/CalendarWidget';
// import NewSessionButton from '../components/NewSessionButton';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header Component */}
      <HomeHeader />

      {/* Main Content Section */}
      <main className="main-content">
        {/* Sidebar Component */}
        {/* <Sidebar /> */}

        {/* Main Dashboard Area */}
        <section className="dashboard">
          {/* Search Bar */}
          {/* <SearchBar /> */}

          {/* Welcome & New Session Button */}
          <div className="welcome-section">
           
            {/* <NewSessionButton /> */}
          </div>

          {/* My Sessions Component */}
          {/* <MySessions /> */}

          {/* Total Study Hours Chart */}
          {/* <StudyHoursChart /> */}

          {/* Upcoming Sessions Component */}
          {/* <UpcomingSessions /> */}
        </section>

        {/* Calendar Widget */}
        <aside className="calendar-widget">
          {/* <CalendarWidget /> */}
        </aside>
      </main>
    </div>
  );
};

export default Home;