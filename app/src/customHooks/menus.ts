import { useLocation } from 'react-router';

const pagesToBlockMenuOn = ['/', '/callback', '/signup'];
export const useShouldBlockMenu = () => {
  const location = useLocation();
  if (pagesToBlockMenuOn.includes(location.pathname)) {
    return true;
  }

  return false;
};

export const useShouldBlockConfess = () => {
  const location = useLocation();
  if (location.pathname.endsWith('submit')) {
    return true;
  }
  return false;
};
