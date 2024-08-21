import axios from 'axios';

// services/signupService.ts

export interface SignupData {
    netID: string;
    password: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export const signupUser = async (signupData: SignupData): Promise<void> => {
    
    try {
        console.log('Signing up user:', signupData);
        const config = {
            method: 'POST',
            url: 'http://localhost:8000/signup/',
            headers: {
            'Content-Type': 'application/json',
            // 'Cookie': "csrftoken=XuQeCzGvWHutzabb5A0EtFALmGsEHHFz" , // Add the Host header here
            },
            data: signupData,
        };
        const response = await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        });
        // Handle success
        console.log('Signup successful');
    } catch (error: any) {
        const messages = Object.entries(error.response.data).map(([key, messages]) => `Invalid ${key}: ${(messages as string[]).join(', ')}`)
        .join('\n');
        console.log(messages);
        alert(messages);
        throw error; // rethrow the error for further handling in the component
    }
};