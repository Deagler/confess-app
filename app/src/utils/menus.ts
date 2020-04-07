import { useLocation } from 'react-router';

const pagesToBlockMenuOn = ['/', '/callback'];
export const useShouldBlockMenu = () => {
  const location = useLocation();
  if (pagesToBlockMenuOn.includes(location.pathname)) {
    return true;
  }

  return false;
};
