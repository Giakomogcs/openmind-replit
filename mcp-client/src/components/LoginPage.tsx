import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setActiveProject } = useAppStore();

  const handleLogin = () => {
    // In a real app, you'd have a proper login form.
    // Here, we'll just simulate a login and redirect to the project hub.
    setActiveProject(null);
    navigate('/projects');
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>This is a placeholder login page.</p>
      <button onClick={handleLogin}>Go to Project Hub</button>
    </div>
  );
};

export default LoginPage;
