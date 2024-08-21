import React from 'react';
import InputField from './InputField';

interface SignupFormProps {
    netID: string;
    setnetID: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    first_name: string;
    setfirst_name: React.Dispatch<React.SetStateAction<string>>;
    last_name: string;
    setlast_name: React.Dispatch<React.SetStateAction<string>>;
    handleJoin: (event: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ netID, setnetID, password, setPassword, username, setUsername, email, setEmail, first_name, setfirst_name, last_name, setlast_name, handleJoin }) => {
    
    return (
        <form className="signup-form" onTouchStart={handleJoin} onSubmit={handleJoin}>
            <InputField 
                id="netID" 
                label="netID" 
                type="text" 
                placeholder="netID"
                icon={<span>&#x2709;</span>}  // Envelope icon
                value={netID}
                onChange={(e) => {
                    setnetID(e.target.value);
                    
                }}
            />
            <InputField 
                id="username" 
                label="Username" 
                type="text" 
                placeholder="Username" 
                icon={<span>&#x1F464;</span>}  // Person icon
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />

            <InputField 
                id="email" 
                label="Email" 
                type="email" 
                placeholder="Email" 
                icon={<span>&#x2709;</span>}  // Envelope icon
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField 
                id="first_name" 
                label="First Name" 
                type="text" 
                placeholder="First Name" 
                icon={<span>&#x1F464;</span>}  // Person icon
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
            />
            <InputField 
                id="last_name" 
                label="Last Name" 
                type="text" 
                placeholder="Last Name" 
                icon={<span>&#x1F464;</span>}  // Person icon
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
            />
             <InputField 
                id="password" 
                label="Password" 
                type="password" 
                placeholder="**********" 
                icon={<span>&#x1F512;</span>}  // Lock icon
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit" className="join-button">Join</button>
        </form>
    );
};

export default SignupForm;