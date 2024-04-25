// Login.js
import React, { useEffect } from 'react';

const Login = ({ onLogin }) => {
  useEffect(() => {
    // Check if authentication callback is received
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    if (accessToken) {
      // Call onLogin function with the access token
      onLogin(accessToken);
    }
  }, [onLogin]);

  const handleLoginClick = () => {
    // Redirect user to WSO2 Choreo login page
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLoginClick}>Login with WSO2 Choreo</button>
    </div>
  );
};

export default Login;
