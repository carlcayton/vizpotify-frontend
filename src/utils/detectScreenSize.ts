import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  const isMobileQuery = useMediaQuery({ query: '(max-width: 768px)' });
  const [isMobile, setIsMobile] = useState(isMobileQuery);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (domLoaded) {
      setIsMobile(isMobileQuery);
    }
  }, [domLoaded, isMobileQuery]);

  return isMobile;
};

export {
  useIsMobile
}
