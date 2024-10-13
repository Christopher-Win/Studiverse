import React, {ReactNode, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useAuth } from '../../Context/AuthContext';
import { getCookie } from '../../Context/AuthContext';

const PendingButton: React.FC = () => (
  <button disabled={true} className="follow-button pending">
    Pending
  </button>
);

export default PendingButton;