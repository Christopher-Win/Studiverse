import axios from "axios";
import { getCookie } from "./CookieService";

// const base_url = process.env.REACT_APP_API_BASE_URL;

export const fetchFollowersSerivce = async (netID: string) => {
    const token = getCookie('token');
    try {
        const response = await axios.get(`http://localhost:8000/friendships/${netID}/followers/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Send cookies with the request
        });
        console.log(response);
        return response;
    } catch (error: any) {
        // Handle the error appropriately
        const messages = Object.entries(error.response.data).map(([key, messages]) => `${(messages as string[]).join(', ')}`)
        .join('\n');
        console.log(messages);
        alert(messages);
        throw error; // rethrow the error for further handling in the component
    }
  };