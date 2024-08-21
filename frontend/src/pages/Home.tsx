import React from 'react'
import Sidebar from '../components/Sidebar'
import SearchBar from '../components/SearchBar'
import MainContent from '../components/MainContent'

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-grow flex flex-col">
        <SearchBar />
        <div className="flex flex-grow">
          <MainContent />
          {/* <Calendar /> */}
        </div>
      </main>
    </div>
  )
}

export default Home
