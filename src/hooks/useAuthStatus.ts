import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkAuthentication } from 'services/commonService';

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false);

  const router = useRouter();
  const { spotifyId } = router.query;

  useEffect(() => {
    if (spotifyId) {
      checkAuthentication()
        .then(response => {
          setIsAuthenticated(response.isAuthenticated);
          if (response.isAuthenticated) {
            setIsViewingOwnProfile(response.spotifyId === spotifyId);
          } else {
            setIsViewingOwnProfile(false);
          }
        })
        .catch(error => {
          console.error('Error checking authentication status:', error);
          setIsAuthenticated(false);
          setIsViewingOwnProfile(false);
        });
    }
  }, [spotifyId]);

  return { isAuthenticated, isViewingOwnProfile };
};

export default useAuthStatus;
