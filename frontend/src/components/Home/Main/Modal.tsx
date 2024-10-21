import React from 'react';
import './Header.css';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;  // Optional title for the modal
  showCloseButton?: boolean;  // Option to show a close button
  overlayClose?: boolean;  // Allow closing modal by clicking overlay
  className?: string;  // Optional custom CSS class
}

const Modal: React.FC<ModalProps> = ({
    isVisible,
    onClose,
    children,
    title,
    showCloseButton = true,
    overlayClose = true,
    className
}) => {
  if (!isVisible) {
        return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (overlayClose && e.target === e.currentTarget) {
            onClose();
        }
  };

  return (
    <div className='modal-container'>
        <div className='modal-container-box'>
            <div className='modal-box'>
                <div className='background'/>
                <div className='content-container'>
                    <div className='content'>
                        <div className='area'>
                            <div aria-label='Create Session' className='content-box'>
                                <div className='content-box-inner'>
                                    <div className='box'>
                                        <div className='limit'>
                                            <div className='content'>
                                                <div className='header1'>
                                                    <div className='header2'>
                                                        <div className='header3'>
                                                            <div className='header4'>
                                                                <div className='header5'>
                                                                    <div className='header6'>
                                                                        <div className='header7'>Create Session</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`content-form`} onClick={handleOverlayClick}>
                                                    <div className="box">
                                                        {showCloseButton && (
                                                        <button className="modal-close" onClick={onClose}>
                                                            &times;
                                                        </button>
                                                        )}
                                                        {/* {title && <h2>{title}</h2>} */}
                                                        {children}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  );
};

export default Modal;