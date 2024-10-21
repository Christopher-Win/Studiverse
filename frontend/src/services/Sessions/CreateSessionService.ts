import axios from "axios";
import { getCookie } from "../CookieService";

// const base_url = process.env.REACT_APP_API_BASE_URL;
interface SessionData {
    title: string;
    session_code: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    session_size: number;
    is_private: boolean;
    
}
export const CreateSession = async (sessionData:SessionData) => {
    const token = getCookie('token');
    const csrftoken = getCookie('csrftoken');
    if(csrftoken){
        try {
            const response = await axios.post(`http://localhost:8000/session/create/`,{sessionData}, {
                method: 'POST',
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