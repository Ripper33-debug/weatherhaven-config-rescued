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
    logoUrl: string;
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
      logoUrl: 'https://weatherhaven.com/wp-content/uploads/2021/03/weatherhaven-logo-white.png',
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
      logoUrl: 'https://via.placeholder.com/200x80/2d3748/ffffff?text=TechCorp',
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
      logoUrl: 'https://via.placeholder.com/200x80/1a202c/ffffff?text=Global+Marketing',
      primaryColor: '#1a202c',
      secondaryColor: '#718096'
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
      logoUrl: 'https://via.placeholder.com/200x80/2c5282/ffffff?text=Defense+Systems',
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
      logoUrl: 'https://via.placeholder.com/200x80/744210/ffffff?text=Secure+Solutions',
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
