// services/LoginService.ts
import axios from 'axios';

export interface LoginData {
    netID: string;
    password: string;
}

export const loginUser = async (loginData: LoginData): Promise<void> => {
    try {
        const response = await axios.post('http://localhost:8000/login/', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Send cookies with the request
        });

        console.log('Login successful:', response.data);
        
    } catch (error: any) {
        // Handle the error appropriately
        const messages = Object.entries(error.response.data).map(([key, messages]) => `${(messages as string[]).join(', ')}`)
        .join('\n');
        console.log(messages);
        alert(messages);
        throw error; // rethrow the error for further handling in the component
    }
};