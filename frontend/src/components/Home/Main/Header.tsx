import React, {useState} from 'react'
import '../../../index.css'
import { useAuth } from '../../../Context/AuthContext';
import Modal from './Modal';
import SessionForm from '../../Forms/SessionForm';

const Header:React.FC = () => {
    const { userData } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);

    const handleNewSessionClick = () => {
        setModalVisible(true);
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <header className='home-main-header'>
            <section className='home-main-header-welcome'>
                <h2>Good morning, {userData?.first_name}!</h2>
                <p>Explore your progress and learning journey</p>
            </section>
            <button className="home-main-header-button" onClick={handleNewSessionClick}>
                + New Session
            </button>
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
