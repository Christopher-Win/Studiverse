import axios from "axios";
import { getCookie } from "./CookieService";

// const base_url = process.env.REACT_APP_API_BASE_URL;

export const confirmPendingFriendRequests = async (netID:string) => {
    const token = getCookie('token');
    const csrftoken = getCookie('csrftoken');
    if(csrftoken){
        try {
            const response = await axios.post(`http://localhost:8000/inbox/friendships/${netID}/approve/`,{}, {
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Send cookies with the request
            });
            return response;
        } catch (error: any) {
            // Handle the error appropriately
            const messages = Object.entries(error.response.data).map(([key, messages]) => `${(messages as string[]).join(', ')}`)
            .join('\n');
            console.log(messages);
            alert(messages);
            throw error; // rethrow the error for further handling in the component
        }
    }
  };