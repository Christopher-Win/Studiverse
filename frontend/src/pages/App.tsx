import '../index.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomePage from './WelcomePage';
import SignupPage from './SignupPage';
import SignInPage from './SignInPage';
import Home from './Home';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../components/AuthContext';

// App component

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        
                        {/* Add more protected routes here */}
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
