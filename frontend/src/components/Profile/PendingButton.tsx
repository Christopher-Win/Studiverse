import React, {ReactNode, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../AuthContext';
import { getCookie } from '../../components/AuthContext';

const PendingButton: React.FC = () => (
  <button disabled={true} className="follow-button pending">
    Pending
  </button>
);

export default PendingButton;