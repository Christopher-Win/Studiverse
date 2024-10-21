import React, { useState } from 'react';
import axios from 'axios';
import './SessionForm.css';
import '../../index.css';
import InputField from '../InputField'; // Reusing the InputField component
import { title } from 'process';
interface SessionFormProps {
  onSubmit: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    session_code: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    session_size: 0,
    is_private: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/sessions/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onSubmit(); // Call a callback function to redirect or show success message
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        
        <InputField id="title" name='title' label="Session Name" type='text' placeholder="Session Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <InputField
            id="description"
            label="Description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <InputField
            id="session_code"
            label="Session Code"
            type="text"
            placeholder="Session Code"
            value={formData.session_code}
            onChange={(e) => setFormData({ ...formData, session_code: e.target.value })}
        />
        <InputField
            id="location"
            label="Location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <InputField
            id="start_time"
            label="Start Time"
            type="datetime-local"
            placeholder="Start Time"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
        />
        <InputField
            id="end_time"
            label="End Time"
            type="datetime-local"
            placeholder="End Time"
            value={formData.end_time}
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
        />
        <InputField
            id="session_size"
            label="Session Size"
            type="number"
            placeholder="Session Size"
            value={formData.session_size.toString()}
            onChange={(e) => setFormData({ ...formData, session_size: parseInt(e.target.value) })}
        />
    
      <button type="submit" className='create-session-button'>Create Session</button>
    </form>
  );
};

export default SessionForm;