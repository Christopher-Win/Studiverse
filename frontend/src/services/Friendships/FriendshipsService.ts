// src/services/friendshipService.ts
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
  
  interface Friend {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    is_active: boolean;
    friends: string[]; // Array of usernames
    sessions: Session[];
    current_session: Session | null;
    profile_image: string; 
  }

export const getActiveFriends = async (): Promise<Friend[]> => {
    try{
        const response = await apiClient.get('friendships/activity/');
        // The API returns an object with a key 'friends_in_sessions'
        return response.data.friends_in_sessions;
    } catch (error) {
        console.error('Error fetching active friends:', error);
        throw error;
    }
};