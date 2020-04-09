import { useLocation, useParams } from 'react-router-dom';

export const useSelectedChannel = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return query.get('channel');
};

export const useSelectedCommunity = () => {
  const { communityId } = useParams();

  // persist selected community across sessions
  return communityId || localStorage.getItem('selectedCommunityId');
};
