// services/Sessions/GetActiveSessionsService.ts
import axios from 'axios';
import apiClient from '../../apiClient';

interface Session {
    title: string;
    session_code: string;
    description: string;
    start_time: string;
    end_time: string;
    created_by: string;
    location: string;
    session_size: number;
    is_private: boolean;
    users: string[];
    participants: string[];
  }
  
export const GetActiveSessions = async () => {
    try {
            const response = await apiClient.get("session/?all=true");
            return response.data;
    } catch (error) {
            console.error("Error fetching active sessions:", error);
            throw error;
    }
};