import React from 'react';

interface ImageDisplayProps {
    src: string;
    alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
    return (
        <div className="signup-image">
            <img src={src} alt={alt} />
        </div>
    );
};

export default ImageDisplay;