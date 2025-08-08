// User Management Configuration
// Add, remove, or modify users here to control access to the system

export interface UserCredentials {
  username: string;
  password: string;
  userData: {
    username: string;
    rank: string;
    clearance: string;
    department?: string;
    lastLogin?: string;
    permissions?: string[];
  };
}

export const AUTHORIZED_USERS: UserCredentials[] = [
  {
    username: 'admin',
    password: 'Weatherhaven2024!',
    userData: {
      username: 'System Administrator',
      rank: 'ADMIN',
      clearance: 'TOP SECRET',
      department: 'IT',
      permissions: ['full_access', 'user_management', 'system_config']
    }
  },
  {
    username: 'demo',
    password: 'Demo2024!',
    userData: {
      username: 'Demo User',
      rank: 'DEMO',
      clearance: 'CONFIDENTIAL',
      department: 'Sales',
      permissions: ['view_only', 'demo_mode']
    }
  },
  {
    username: 'firestorm',
    password: 'test123',
    userData: {
      username: 'Firestorm Systems',
      rank: 'CLIENT',
      clearance: 'SECRET',
      department: 'Operations',
      permissions: ['full_access', 'export', 'pricing']
    }
  }
];

export const validateCredentials = (username: string, password: string): UserCredentials | null => {
  return AUTHORIZED_USERS.find(
    user => user.username.toLowerCase() === username.toLowerCase() && user.password === password
  ) || null;
};

export const getUserByUsername = (username: string): UserCredentials | null => {
  return AUTHORIZED_USERS.find(
    user => user.username.toLowerCase() === username.toLowerCase()
  ) || null;
};

// Session management
export const createSession = (user: UserCredentials) => {
  const session = {
    userId: user.username,
    timestamp: new Date().toISOString(),
    permissions: user.userData.permissions || []
  };
  
  // In a real app, this would be stored securely
  localStorage.setItem('trecc_session', JSON.stringify(session));
  return session;
};

export const getCurrentSession = () => {
  const session = localStorage.getItem('trecc_session');
  return session ? JSON.parse(session) : null;
};

export const clearSession = () => {
  localStorage.removeItem('trecc_session');
};
