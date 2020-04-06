import { useLocation } from 'react-router';

const pagesToBlockMenuOn = ['/landing', '/callback'];
export const useShouldBlockMenu = () => {
  const location = useLocation();
  if (pagesToBlockMenuOn.includes(location.pathname)) {
    return true;
  }

  return false;
};
