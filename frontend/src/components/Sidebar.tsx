import React from 'react';
import '../index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar-inner">

      <ul className="sidebar-menu">
        <li className="sidebar-item">
                <Link to="/home" className="sidebar-item-link">
                    <div className="sidebar-item-inner">

                        <div className="item-icon">
                            <i className="fas fa-home"></i> {/* Home Icon */}
                        </div>
                        <div className="item-label">
                            <span>Home</span>
                        </div>

                    </div>
                </Link>
        </li>
        <li className="sidebar-item">
                <Link to="/friends" className="sidebar-item-link">
                    <div className="sidebar-item-inner">

                        <div className="item-icon">
                            <i className="fas fa-user-group"></i> {/* Home Icon */}
                        </div>
                        <div className="item-label">
                            <span>Friends</span>
                        </div>

                    </div>
                </Link>
        </li>
        <li className="sidebar-item">
                <Link to="/inbox" className="sidebar-item-link">
                    <div className="sidebar-item-inner">

                        <div className="item-icon">
                            <i className="fas fa-inbox"></i> {/* Home Icon */}
                        </div>
                        <div className="item-label">
                            <span>Inbox</span>
                        </div>

                    </div>
                </Link>
        </li>
        {/* Add more sidebar items here */}
      </ul>

    </nav>
  );
};

export default Sidebar;