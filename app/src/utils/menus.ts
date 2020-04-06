import { useLocation } from 'react-router';

export const useShouldBlockMenu = () => {
  const location = useLocation();
  if (location.pathname === '/landing') {
    return true;
  }

  return false;
}
