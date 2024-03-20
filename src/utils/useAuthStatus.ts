
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { checkAuthentication } from 'services/commonService';

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { spotifyId } = router.query;

  useEffect(() => {
    if (spotifyId) {
      checkAuthentication()
        .then(response => {
          setIsAuthenticated(response.isAuthenticated && response.spotifyId === spotifyId);
        })
        .catch(error => {
          console.error('Error checking authentication status:', error);
          setIsAuthenticated(false);
        });
    }
  }, [spotifyId]);

  return isAuthenticated;
};

export default useAuthStatus;
