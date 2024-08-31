import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the UserData interface
interface UserData {
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
}

// Define the context type
interface AuthContextType {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    fetchUserData: () => void;
}

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

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

    useEffect(() => {
        fetchUserData(); // Fetch user data on mount if the token exists
    }, []); // Empty dependency array ensures this runs only on mount

    return (
        <AuthContext.Provider value={{ userData, setUserData, fetchUserData }}>
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