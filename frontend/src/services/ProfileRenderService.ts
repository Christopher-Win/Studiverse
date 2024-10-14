import axios from "axios";
import { getCookie } from "./CookieService";

export const fetchUserData = async (username: string) => { // Fetch user data based on the username from the URL
    console.log("Fetching User Data for:",username);
    const token = getCookie('token');
    if (token) {
    try {
        const response = await axios.get(`http://localhost:8000/${username}/`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
         withCredentials: true, // Send cookies with the request
        });
        console.log("Profile Rendered:",response.data[0]);
        return response.data[0];
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        return null;
    }
    } else {
        return(null);
    }
};