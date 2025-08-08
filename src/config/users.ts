// User Management Configuration
// Add, remove, or modify users here to control access to the system

export interface UserCredentials {
  username: string;
  password: string;
  userData: {
    username: string;
    rank: string;
    clearance: string;
  };
  clientBranding?: {
    companyName: string;
    logoFolder: number; // Numbered folder (1-10, etc.)
    primaryColor: string;
    secondaryColor: string;
    customCss?: string;
  };
}

export const AUTHORIZED_USERS: UserCredentials[] = [
  {
    username: 'ceo',
    password: 'executive2024',
    userData: {
      username: 'Chief Executive Officer',
      rank: 'CEO',
      clearance: 'TOP SECRET'
    },
    clientBranding: {
      companyName: 'Weatherhaven',
      logoFolder: 0, // 0 = Weatherhaven (no client logo)
      primaryColor: '#1a202c',
      secondaryColor: '#4a5568'
    }
  },
  {
    username: 'dev',
    password: 'develop2024',
    userData: {
      username: 'Development Team',
      rank: 'Technical Lead',
      clearance: 'SECRET'
    },
    clientBranding: {
      companyName: 'TechCorp Solutions',
      logoFolder: 2,
      primaryColor: '#2d3748',
      secondaryColor: '#4a5568'
    }
  },
  {
    username: 'mkt',
    password: 'marketing2024',
    userData: {
      username: 'Marketing Team',
      rank: 'Marketing Lead',
      clearance: 'SECRET'
    },
    clientBranding: {
      companyName: 'Global Marketing Inc',
      logoFolder: 3,
      primaryColor: '#1a202c',
      secondaryColor: '#718096'
    }
  },
  {
    username: 'firestorm',
    password: 'drone',
    userData: {
      username: 'Firestorm Systems',
      rank: 'Operations Director',
      clearance: 'TOP SECRET'
    },
    clientBranding: {
      companyName: 'Firestorm',
      logoFolder: 1,
      primaryColor: '#1a1a1a',
      secondaryColor: '#ff4444'
    }
  },
  {
    username: 'client1',
    password: 'client2024',
    userData: {
      username: 'Client Demo 1',
      rank: 'Project Manager',
      clearance: 'CONFIDENTIAL'
    },
    clientBranding: {
      companyName: 'Defense Systems Ltd',
      logoFolder: 4,
      primaryColor: '#2c5282',
      secondaryColor: '#4299e1'
    }
  },
  {
    username: 'client2',
    password: 'client2024',
    userData: {
      username: 'Client Demo 2',
      rank: 'Operations Director',
      clearance: 'CONFIDENTIAL'
    },
    clientBranding: {
      companyName: 'Secure Solutions Corp',
      logoFolder: 5,
      primaryColor: '#744210',
      secondaryColor: '#d69e2e'
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
