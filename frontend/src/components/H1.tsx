import React from 'react';

// Define the styles for the Text component
// const styles = {
//   Text: {
//     fontSize: '34px',
//     fontFamily: '',
//     fontWeight: 700,
//     lineHeight: '38px',
//     textAlign: 'center',
    
//   } as React.CSSProperties, // TypeScript typing for inline styles
// };

// Define the props type for the Text component
interface H1 {
    children: React.ReactNode;
}


// Functional component definition using TypeScript
const H1: React.FC<H1> = ({children}) => {
return (
    <h1 className='text-4xl font-bold pb-5'>{children}</h1>
);
};



export default H1;