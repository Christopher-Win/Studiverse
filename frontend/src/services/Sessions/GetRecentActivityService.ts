// services/Sessions/GetActiveSessionsService.ts
import axios from 'axios';
import apiClient from '../../apiClient';
  
export const GetRecentActivity = async () => {
    try {
        const response = await apiClient.get("accounts/recent-activity/");
        return response.data.recent_sessions;
    } catch (error) {
        console.error('Failed to fetch recent activity:', error);
        throw error;
    }
};