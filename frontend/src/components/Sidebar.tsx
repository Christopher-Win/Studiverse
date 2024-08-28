import React from 'react';
import '../index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/home" className="sidebar-link">
            <i className="fas fa-home"></i> {/* Home Icon */}
            <p>Home</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/friends" className="sidebar-link">
            <i className="fas fa-user-group"></i> {/* Friends Icon */}
            <p>Friends</p>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/friends" className="sidebar-link">
            <i className="fas fa-inbox"></i> {/* Friends Icon */}
            <p>Invites</p>
          </Link>
        </li>
        {/* Add more sidebar items here */}
      </ul>
    </nav>
  );
};

export default Sidebar;