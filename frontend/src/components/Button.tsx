import React from 'react'


const styles = {
    Button: {
        cursor: 'pointer',
        width: '66%',
        height: '77px',
        alignSelf: 'center',
        boxSizing: 'border-box',
        borderRadius: '24px',
        backgroundColor: '#540ecc',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Source Sans Pro',
        fontWeight: 500,
        outline: 'none',
    } as React.CSSProperties,
};

type Button = {
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<Button> = ({children, onClick}) => {
  return (
    <>
        <button onTouchStart={onClick} onClick={onClick} style = {styles.Button} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pt'>
            {children}
        </button>
    </>
  )
}

export default Button
