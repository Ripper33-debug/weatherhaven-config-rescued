import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfiguratorState } from '../App';
import { User } from '../App';

interface CollaborationUser {
  id: string;
  user: User;
  position: { x: number; y: number; z: number };
  timestamp: number;
}

interface CollaborationContextType {
  isCollaborating: boolean;
  activeUsers: CollaborationUser[];
  sessionId: string | null;
  joinSession: (sessionId: string) => void;
  leaveSession: () => void;
  updatePosition: (position: { x: number; y: number; z: number }) => void;
  shareConfiguration: (config: ConfiguratorState) => void;
}

const CollaborationContext = createContext<CollaborationContextType | null>(null);

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

interface CollaborationProviderProps {
  children: React.ReactNode;
  currentUser: User;
}

export const CollaborationProvider: React.FC<CollaborationProviderProps> = ({ 
  children, 
  currentUser 
}) => {
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [activeUsers, setActiveUsers] = useState<CollaborationUser[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Mock collaboration simulation
  const joinSession = (newSessionId: string) => {
    setIsCollaborating(true);
    setSessionId(newSessionId);
    
    // Simulate other users joining
    const mockUsers: CollaborationUser[] = [
      {
        id: 'user1',
        user: {
          username: 'Demo User 1',
          rank: 'Technical Lead',
          clearance: 'SECRET'
        },
        position: { x: 0, y: 0, z: 0 },
        timestamp: Date.now()
      },
      {
        id: 'user2',
        user: {
          username: 'Demo User 2',
          rank: 'Project Manager',
          clearance: 'SECRET'
        },
        position: { x: 0, y: 0, z: 0 },
        timestamp: Date.now()
      }
    ];
    
    setActiveUsers(mockUsers);
    
            // Joined collaboration session
  };

  const leaveSession = () => {
    setIsCollaborating(false);
    setSessionId(null);
    setActiveUsers([]);
            // Left collaboration session
  };

  const updatePosition = (position: { x: number; y: number; z: number }) => {
    if (isCollaborating) {
              // Position updated
      // In a real implementation, this would send to other users
    }
  };

  const shareConfiguration = (config: ConfiguratorState) => {
    if (isCollaborating) {
              // Configuration shared
      // In a real implementation, this would sync with other users
    }
  };

  // Simulate user activity
  useEffect(() => {
    if (isCollaborating) {
      const interval = setInterval(() => {
        setActiveUsers(prev => prev.map(user => ({
          ...user,
          timestamp: Date.now()
        })));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isCollaborating]);

  // Remove inactive users (older than 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveUsers(prev => prev.filter(user => now - user.timestamp < 10000));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const value: CollaborationContextType = {
    isCollaborating,
    activeUsers,
    sessionId,
    joinSession,
    leaveSession,
    updatePosition,
    shareConfiguration
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};
