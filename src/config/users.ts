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
  clientBranding?: {
    companyName: string;
    logoFolder: number; // Numbered folder (1-10, etc.)
    primaryColor: string;
    secondaryColor: string;
    customCss?: string;
    contactInfo?: {
      email: string;
      phone: string;
      address: string;
    };
    features?: {
      enableARVR: boolean;
      enableCollaboration: boolean;
      enableDemoMode: boolean;
      enableExport: boolean;
      enablePricing: boolean;
    };
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
    },
    clientBranding: {
      companyName: 'Weatherhaven Technologies',
      logoFolder: 0, // 0 = Weatherhaven (no client logo)
      primaryColor: '#1a202c',
      secondaryColor: '#4a5568',
      contactInfo: {
        email: 'info@weatherhaven.com',
        phone: '+1-604-594-4424',
        address: 'Burnaby, BC, Canada'
      },
      features: {
        enableARVR: true,
        enableCollaboration: true,
        enableDemoMode: true,
        enableExport: true,
        enablePricing: true
      }
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
    },
    clientBranding: {
      companyName: 'Weatherhaven Technologies',
      logoFolder: 0,
      primaryColor: '#1a202c',
      secondaryColor: '#4a5568',
      features: {
        enableARVR: false,
        enableCollaboration: false,
        enableDemoMode: true,
        enableExport: false,
        enablePricing: false
      }
    }
  },
  {
    username: 'firestorm',
    password: 'Firestorm2024!',
    userData: {
      username: 'Firestorm Systems',
      rank: 'CLIENT',
      clearance: 'SECRET',
      department: 'Operations',
      permissions: ['full_access', 'export', 'pricing']
    },
    clientBranding: {
      companyName: 'Firestorm Systems',
      logoFolder: 1,
      primaryColor: '#1a1a1a',
      secondaryColor: '#ff4444',
      contactInfo: {
        email: 'operations@firestorm.com',
        phone: '+1-555-0123',
        address: 'Defense Contractor'
      },
      features: {
        enableARVR: true,
        enableCollaboration: true,
        enableDemoMode: true,
        enableExport: true,
        enablePricing: true
      }
    }
  },
  {
    username: 'defense_systems',
    password: 'Defense2024!',
    userData: {
      username: 'Defense Systems Ltd',
      rank: 'CLIENT',
      clearance: 'SECRET',
      department: 'Procurement',
      permissions: ['full_access', 'export', 'pricing']
    },
    clientBranding: {
      companyName: 'Defense Systems Ltd',
      logoFolder: 4,
      primaryColor: '#2c5282',
      secondaryColor: '#4299e1',
      contactInfo: {
        email: 'procurement@defensesystems.com',
        phone: '+1-555-0456',
        address: 'Military Contractor'
      },
      features: {
        enableARVR: true,
        enableCollaboration: true,
        enableDemoMode: true,
        enableExport: true,
        enablePricing: true
      }
    }
  },
  {
    username: 'secure_solutions',
    password: 'Secure2024!',
    userData: {
      username: 'Secure Solutions Corp',
      rank: 'CLIENT',
      clearance: 'CONFIDENTIAL',
      department: 'Engineering',
      permissions: ['full_access', 'export']
    },
    clientBranding: {
      companyName: 'Secure Solutions Corp',
      logoFolder: 5,
      primaryColor: '#744210',
      secondaryColor: '#d69e2e',
      contactInfo: {
        email: 'engineering@securesolutions.com',
        phone: '+1-555-0789',
        address: 'Security Solutions'
      },
      features: {
        enableARVR: false,
        enableCollaboration: true,
        enableDemoMode: true,
        enableExport: true,
        enablePricing: false
      }
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
    permissions: user.userData.permissions || [],
    clientBranding: user.clientBranding
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
