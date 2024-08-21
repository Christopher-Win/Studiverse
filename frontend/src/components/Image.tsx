import React from 'react';

const styles = {
    ImageContainer: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px', // Add height property to ensure the container has dimensions
        borderRadius: '24px',
        backgroundImage: `url(${'./image.png'})`, // Use the 'image' prop as the background image source
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
};

interface defaultProps {
  image: 'https://assets.api.uizard.io/api/cdn/stream/11127f22-9d0b-4ae2-9d39-c169bbcf6256.png',
}

const Image: React.FC<defaultProps> = ({image}) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url(${image ?? image})`,
        }} 
    />
  );
};

export default Image;