import React, {useState,useEffect, useContext} from 'react'
import '../../../index.css'
import { useAuth } from '../../../Context/AuthContext';
import Modal from './Modal';
import SessionForm from '../../Forms/SessionForm';
import { Session } from './CurrentSession';

const Header:React.FC = () => {
    const { userData } = useAuth(); // Get the userData from the AuthContext
    const [isModalVisible, setModalVisible] = useState(false); // State for the modal visibility
    const [currentSession, setCurrentSession] = useState<Session | null>(null);

    const handleNewSessionClick = () => {
        setModalVisible(true);
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
        // Re-render the Header by updating the state
        
    };
    useEffect(() => {
        setCurrentSession(userData?.currentSession); // Set the current session from the user data
        console.log("User Data",userData);
    }
    , [userData]); // This effect runs when the userData changes
    
    
    return (
        <header className='home-main-header'>
            <section className='home-main-header-welcome'>
                <h2>Good morning, {userData?.first_name}!</h2>
                <p>Explore your progress and learning journey</p>
            </section>
            {/* Only display New Session button if User is not in a Session */}
            {currentSession && !(currentSession.title !== "") && (

                <button className="home-main-header-button" onClick={handleNewSessionClick}>
                    + New Session
                </button>
                
            )}
            {/* Modal for creating a new session */}
            <Modal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                title="Create New Session"
                showCloseButton={true}
                overlayClose={true}
            >
                <SessionForm onSubmit={handleCloseModal} />
            </Modal>
        </header>
    )
}

export default Header
