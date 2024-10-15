import React, { useState } from 'react';
import '../../index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import FollowRequestsPanel from '../Sidebar/Inbox/FollowRequestsPanel';
import { useSidebar } from '../../Context/SidebarContext'; // Adjust the import path as needed

interface SidebarProps {
    toggleSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = () => {
    const [isInboxPanelOpen, setIsInboxPanelOpen] = useState(false);

    const { sidebarOpen, toggleSidebar } = useSidebar();

    const toggleInboxPanel = () => {
        setIsInboxPanelOpen(!isInboxPanelOpen); // Toggle the panel state
        toggleSidebar();
    };

    return (
        <>
        <nav className={`sidebar-inner ${isInboxPanelOpen ? 'selected':''}`}>
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
                <li className={`sidebar-item ${isInboxPanelOpen? 'selected': ''}`} onClick={toggleInboxPanel}>
                        <div className="sidebar-item-link">
                            <div className="sidebar-item-inner">

                                <div className="item-icon">
                                    <i className="fas fa-inbox"></i> {/* Home Icon */}
                                </div>
                                { !isInboxPanelOpen &&
                                    <div className="item-label">
                                        <span>Inbox</span>
                                    </div> 
                                }
                            </div>
                        </div>   
                </li>
                {/* Add more sidebar items here */}           
            </ul>
        </nav>
        {(isInboxPanelOpen) &&
            <FollowRequestsPanel isOpen={isInboxPanelOpen} toggleInboxPanel={toggleInboxPanel} />
        }
    </>
    );
};

export default Sidebar;