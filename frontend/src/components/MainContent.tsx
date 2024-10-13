import React from 'react';
import SessionsPreview from './SessionsPreview';
import { useAuth } from '../Context/AuthContext';


const MainContent: React.FC = () => {
   
  return (
    <section className="flex-grow p-4 bg-gray-800">
      
    {/* <SessionsPreview/> */}
      <article>
        <h2 className="text-xl font-semibold">Total study hours</h2>
        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          {/* Replace with actual chart component */}
          <p>Chart Placeholder</p>
        </div>
      </article>
    </section>
  );
};

export default MainContent;