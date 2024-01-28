import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = () => {
  const [profile, setProfile] = useState({
    spotifyId: '',
    userDisplayName: '',
    profilePictureUrl: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true
        });
        if (response.data) {
          setProfile({
            spotifyId: response.data.spotifyId,
            userDisplayName: response.data.userDisplayName,
            profilePictureUrl: response.data.profilePictureUrl,
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setProfile({
          spotifyId: '',
          userDisplayName: '',
          profilePictureUrl: '',
        });
      }
    };
    fetchUserProfile();
  }, []);

  return profile;
};

export default useUserProfile;
