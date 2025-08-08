import React, { useState, useEffect } from 'react';
import { User } from '../App';
import { AUTHORIZED_USERS, validateCredentials, UserCredentials } from '../config/users';
import { useBranding } from './BrandingProvider';

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
  const [currentBranding, setCurrentBranding] = useState<UserCredentials['clientBranding'] | undefined>(undefined);
  
  const { applyBranding } = useBranding();

  // Animated scan line effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update branding when username changes
  useEffect(() => {
    if (username) {
      const user = AUTHORIZED_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
      if (user?.clientBranding) {
        setCurrentBranding(user.clientBranding);
      } else {
        setCurrentBranding(undefined);
      }
    } else {
      setCurrentBranding(undefined);
    }
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user exists and password matches
    const user = validateCredentials(username, password);

    if (user) {
      // Apply branding for the logged-in user
      applyBranding(user);
      
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
      {/* Interactive military background */}
      <div className="login-background">
        <div className="grid-overlay"></div>
        <div className="radar-sweep"></div>
        <div className="targeting-reticle top-left"></div>
        <div className="targeting-reticle top-right"></div>
        <div className="targeting-reticle bottom-left"></div>
        <div className="targeting-reticle bottom-right"></div>
        <div className="data-stream"></div>
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
            {currentBranding ? (
              <>
                <div className="client-logo">
                  <img 
                    src={`/logos/clients/${currentBranding.logoFolder}.svg`} 
                    alt={`${currentBranding.companyName} Logo`}
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="logo-fallback hidden">
                    <h1 className="system-title">{currentBranding.companyName}</h1>
                  </div>
                </div>
                <p className="system-subtitle">MILITARY SHELTER CONFIGURATOR</p>
                <div className="security-badge">
                  <span className="badge-text">SECURE ACCESS</span>
                </div>
              </>
            ) : (
              <>
                <h1 className="system-title">WEATHERHAVEN</h1>
                <p className="system-subtitle">MILITARY SHELTER CONFIGURATOR</p>
                <div className="security-badge">
                  <span className="badge-text">SECURE ACCESS</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="login-form-container">
          <div className="form-header">
            <h2>SECURE ACCESS TERMINAL</h2>
            <p>Enter your credentials to access the command center</p>
            {currentBranding && (
              <div className="client-info">
                <p>Welcome to {currentBranding.companyName}</p>
              </div>
            )}
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
                className="login-input"
                disabled={loginAttempts >= 3}
                required
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
                className="login-input"
                disabled={loginAttempts >= 3}
                required
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading || loginAttempts >= 3}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                  AUTHENTICATING...
                </>
              ) : (
                'ACCESS SYSTEM'
              )}
            </button>
          </form>
        </div>

        <div className="login-footer">
          <p>CLASSIFIED MILITARY SYSTEM • SECURE ACCESS REQUIRED</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
