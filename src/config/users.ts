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
    username: 'commander',
    password: 'access123',
    userData: {
      username: 'Commander Smith',
      rank: 'Lieutenant Colonel',
      clearance: 'TOP SECRET'
    }
  },
  {
    username: 'tech',
    password: 'tech456',
    userData: {
      username: 'Tech Specialist Johnson',
      rank: 'Sergeant First Class',
      clearance: 'SECRET'
    }
  },
  {
    username: 'operator1',
    password: 'secure789',
    userData: {
      username: 'Operator One',
      rank: 'Staff Sergeant',
      clearance: 'SECRET'
    }
  },
  {
    username: 'analyst',
    password: 'data2024',
    userData: {
      username: 'Data Analyst Wilson',
      rank: 'Technical Sergeant',
      clearance: 'SECRET'
    }
  },
  {
    username: 'engineer',
    password: 'build2024',
    userData: {
      username: 'Systems Engineer Davis',
      rank: 'Master Sergeant',
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
