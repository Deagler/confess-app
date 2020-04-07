import { useLocation } from 'react-router-dom';

export const useSelectedChannel = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return query.get('channel');
};
