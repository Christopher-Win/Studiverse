// services/LoginService.ts
import axios from 'axios';
// import getCookie from './CSRFService';

export interface LoginData {
    netID: string;
    password: string;
}
export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const loginUser = async (loginData: LoginData): Promise<void> => {
    // const csrftoken = getCookie('csrftoken');
    // axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
    // console.log(csrftoken);
    const token = getCookie('token');
    // console.log(token);
    try {
        const response = await axios.post('http://localhost:8000/login/', loginData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            withCredentials: true, // Send cookies with the request
        });

        console.log('Login successful:', response.data);
        // console.log(getCookie('token'));
    } catch (error: any) {
        // Handle the error appropriately
        const messages = Object.entries(error.response.data).map(([key, messages]) => `${(messages as string[]).join(', ')}`)
        .join('\n');
        console.log(messages);
        alert(messages);
        throw error; // rethrow the error for further handling in the component
    }
};