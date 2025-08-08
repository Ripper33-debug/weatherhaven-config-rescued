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
}

export const AUTHORIZED_USERS: UserCredentials[] = [
  {
    username: 'ceo',
    password: 'executive2024',
    userData: {
      username: 'Chief Executive Officer',
      rank: 'CEO',
      clearance: 'TOP SECRET'
    }
  },
  {
    username: 'devteam',
    password: 'develop2024',
    userData: {
      username: 'Development Team',
      rank: 'Technical Lead',
      clearance: 'SECRET'
    }
  },
  {
    username: 'comteam',
    password: 'communicate2024',
    userData: {
      username: 'Communications Team',
      rank: 'Communications Lead',
      clearance: 'SECRET'
    }
  }
];

// Helper function to validate credentials
export const validateCredentials = (username: string, password: string): UserCredentials | null => {
  return AUTHORIZED_USERS.find(
    user => user.username.toLowerCase() === username.toLowerCase() && user.password === password
  ) || null;
};

// Helper function to get user by username
export const getUserByUsername = (username: string): UserCredentials | null => {
  return AUTHORIZED_USERS.find(
    user => user.username.toLowerCase() === username.toLowerCase()
  ) || null;
};
