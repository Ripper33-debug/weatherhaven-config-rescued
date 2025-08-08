import React, { createContext, useContext, useEffect, useState } from 'react';
import { ConfiguratorState } from './ShelterConfigurator';
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
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Generate a unique session ID
  const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Join a collaboration session
  const joinSession = (newSessionId: string) => {
    if (ws) {
      ws.close();
    }

    const websocket = new WebSocket(`wss://echo.websocket.org`); // Using echo service for demo
    
    websocket.onopen = () => {
      console.log('Connected to collaboration server');
      setIsCollaborating(true);
      setSessionId(newSessionId);
      
      // Send join message
      websocket.send(JSON.stringify({
        type: 'join',
        sessionId: newSessionId,
        user: currentUser
      }));
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'user_joined':
            setActiveUsers(prev => [...prev, {
              id: data.userId,
              user: data.user,
              position: data.position,
              timestamp: Date.now()
            }]);
            break;
            
          case 'user_left':
            setActiveUsers(prev => prev.filter(user => user.id !== data.userId));
            break;
            
          case 'position_update':
            setActiveUsers(prev => prev.map(user => 
              user.id === data.userId 
                ? { ...user, position: data.position, timestamp: Date.now() }
                : user
            ));
            break;
            
          case 'configuration_shared':
            // Handle shared configuration updates
            console.log('Configuration shared:', data.config);
            break;
        }
      } catch (error) {
        console.error('Error parsing collaboration message:', error);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsCollaborating(false);
    };

    websocket.onclose = () => {
      console.log('Disconnected from collaboration server');
      setIsCollaborating(false);
      setActiveUsers([]);
    };

    setWs(websocket);
  };

  // Leave collaboration session
  const leaveSession = () => {
    if (ws) {
      ws.send(JSON.stringify({
        type: 'leave',
        sessionId,
        userId: currentUser.username
      }));
      ws.close();
    }
    setIsCollaborating(false);
    setSessionId(null);
    setActiveUsers([]);
  };

  // Update user position
  const updatePosition = (position: { x: number; y: number; z: number }) => {
    if (ws && isCollaborating) {
      ws.send(JSON.stringify({
        type: 'position_update',
        sessionId,
        userId: currentUser.username,
        position
      }));
    }
  };

  // Share configuration with other users
  const shareConfiguration = (config: ConfiguratorState) => {
    if (ws && isCollaborating) {
      ws.send(JSON.stringify({
        type: 'configuration_share',
        sessionId,
        userId: currentUser.username,
        config
      }));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

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
