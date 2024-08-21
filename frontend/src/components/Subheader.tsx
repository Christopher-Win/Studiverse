import React from 'react'

interface SubheaderProps {
    children: React.ReactNode;
}

const Subheader: React.FC <SubheaderProps> = ({children}) => {
  return (
      <h4 className='text-center text-base'>{children}</h4>
    
    );
    
};

export default Subheader;
