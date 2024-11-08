import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode} from 'react';
import axios from 'axios';
import { GetCurrentSession } from '../services/Sessions/GetCurrentSessionService';
// Define the UserData interface
export interface UserData {
    netID: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    friends: UserData[];
    is_active: boolean;
    is_staff: boolean;
    date_joined: string;
    current_session?: any;
}

// Define the context type
interface AuthContextType { // This is where we define the AuthContextType that we need to use in our components.
    userData: UserData | null; // This will be used for the user data that we fetch from the backend.
    currentSession: any | null; // This will be used for the current session that we fetch from the backend.
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>; // This will be used to update the user data.
    fetchUserData: () => void; // This will be used to fetch the user data from the backend.
    fetchCurrentSession: () => void; // This will be used to fetch the current session from the backend.
}

export const getCookie = (name: string) => {
    console.log(`Getting cookie: ${name}`);
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // This is the AuthProvider component that we will use to wrap our application.
    const [userData, setUserData] = useState<UserData | null>(null); // State for the user data
    const [currentSession, setCurrentSession] = useState<any>(null); // State for the current session
    const memoizedCurrentSession = useMemo(() => currentSession, [currentSession]); // This is a memoized version of the current session state to prevent unnecessary re-renders of components that depend on it.
    // Fetch the user data from the backend
    const fetchUserData = async () => {
        const token = getCookie('token');
        console.log(`Token: ${token}`);
        if (token) {
        try {
            const response = await axios.get('http://localhost:8000/accounts/profile/', {
            headers: {
                // 'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Send cookies with the request
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUserData(null);
        }
        } else {
        setUserData(null);
        }
    };
    // Fetch the current session from the backend
    const fetchCurrentSession = async () => { 
        const token = getCookie('token');
        console.log(`Token: ${token}`);
        if (token) {
            try {
                const sessionData = await GetCurrentSession();
                    if (JSON.stringify(sessionData) !== JSON.stringify(currentSession)) { // Only update the state if the session data has changed
                        setCurrentSession(sessionData);
                    }
            } catch (error) {
                console.error('Failed to fetch current session:', error);
            }
        }
    }
    useEffect(() => { 
        fetchUserData(); // Fetch user data on mount if the token exists
        fetchCurrentSession(); // Fetch current session on mount if the token exists
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <AuthContext.Provider value={{ userData, currentSession: memoizedCurrentSession, setUserData, fetchUserData, fetchCurrentSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};