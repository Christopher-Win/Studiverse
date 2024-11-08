import axios from "axios";
import { getCookie } from "../CookieService";

export const EndCurrentSession = async () => {
    const token = getCookie('token');
    const csrftoken = getCookie('csrftoken');
    if(csrftoken){
        try {
            const response = await axios.post(`http://localhost:8000/session/end/`,{},{
                method: 'GET',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Send cookies with the request
            });
            return response.data;
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