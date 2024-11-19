import apiClient from '../../apiClient';


export const JoinSession = async (sessionCode: string) => {
  try {
        const response = await apiClient.put('/session/', {
            session_code: sessionCode,
        });
        return response.data;
  } catch (error) {
        console.error("Error joining session:", error);
        throw error;
  }
};