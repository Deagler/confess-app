import { useLocation } from 'react-router-dom';

export const useSelectedChannel = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return query.get('channel');
};

export const useSelectedCommunity = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // persist selected community across sessions
  return query.get('community') || localStorage.getItem('selectedCommunityId');
};
