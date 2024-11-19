import apiClient from '../../apiClient';

export const LeaveSession = async () => {
    try {
        const response = await apiClient.patch('/session/leave/', {
        });
        return response.data;
    } catch (error) {
        console.error("Error joining session:", error);
        throw error;
    }
};