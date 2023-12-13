
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { spotifyId } = router.query;

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/status', {
          withCredentials: true
        });
        if (response.data.isAuthenticated && response.data.spotifyId === spotifyId) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    if (spotifyId) {
      checkAuthentication();
    }
  }, [spotifyId]);

  return isAuthenticated;
};

export default useAuthStatus;
