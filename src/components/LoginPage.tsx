import React, { useState, useEffect } from 'react';
import { User } from '../App';
import { AUTHORIZED_USERS, validateCredentials } from '../config/users';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanLine, setScanLine] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Animated scan line effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user exists and password matches
    const user = validateCredentials(username, password);

    if (user) {
      // Successful login
      setLoginAttempts(0);
      onLogin(user.userData);
    } else {
      // Failed login
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setError('Multiple failed attempts. Access temporarily restricted.');
        // Could implement a timeout here
      } else {
        setError('Invalid credentials. Access denied.');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {/* Minimalist background */}
      <div className="login-background">
        <div className="grid-overlay"></div>
        <div className="scan-line" style={{ top: `${scanLine}%` }}></div>
        <div className="corner-accent top-left"></div>
        <div className="corner-accent top-right"></div>
        <div className="corner-accent bottom-left"></div>
        <div className="corner-accent bottom-right"></div>
      </div>

      {/* Main login form */}
      <div className="login-content">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-symbol">⚡</div>
            <h1 className="system-title">WEATHERHAVEN</h1>
            <p className="system-subtitle">MILITARY SHELTER CONFIGURATOR</p>
            <div className="security-badge">
              <span className="badge-text">SECURE ACCESS</span>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <div className="form-header">
            <h2>SECURE ACCESS TERMINAL</h2>
            <p>Enter your credentials to access the command center</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="login-input"
                disabled={loginAttempts >= 3}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="login-input"
                disabled={loginAttempts >= 3}
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading || loginAttempts >= 3}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span className="button-icon">🔐</span>
                  <span>ACCESS SYSTEM</span>
                </>
              )}
            </button>
          </form>

          <div className="demo-credentials">
            <h4>Team Access:</h4>
            <div className="credential-pair">
              <span>CEO:</span>
              <span>ceo / executive2024</span>
            </div>
            <div className="credential-pair">
              <span>Dev Team:</span>
              <span>dev / develop2024</span>
            </div>
            <div className="credential-pair">
              <span>Marketing:</span>
              <span>mkt / marketing2024</span>
            </div>
            <div className="credential-note">
              <span>Contact administrator for access credentials</span>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>CLASSIFIED MILITARY SYSTEM</p>
          <p>Unauthorized access will be prosecuted</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
