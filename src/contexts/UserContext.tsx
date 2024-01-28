// contexts/UserContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { fetchAuthentication } from '../services/userService';

interface UserProfile {
  spotifyId: string;
  userDisplayName: string;
  profilePictureUrl: string;
}

const UserContext = createContext<UserProfile | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetchAuthentication();
        if (response.isAuthenticated) {
          setUserProfile({
            spotifyId: response.spotifyId,
            userDisplayName: response.userDisplayName,
            profilePictureUrl: response.profilePictureUrl,
          });
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setUserProfile(null);
      }
    };

    checkAuthentication();
  }, []);

  return <UserContext.Provider value={userProfile}>{children}</UserContext.Provider>;
};

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
};

// ... [rest of your code]
