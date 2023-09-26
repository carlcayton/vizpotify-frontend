import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return isMobile;
};

export {
  useIsMobile
}