import { useSelectedCommunity } from './location';
import { useQuery } from '@apollo/react-hooks';
import {
  GetCommunityById,
  GetCommunityByIdVariables,
} from '../types/GetCommunityById';
import { GET_COMMUNITY_BY_ID } from '../common/graphql/communities';

export const useSelectedCommunityQuery = () => {
  const communityId = useSelectedCommunity();

  const useQueryVariables = useQuery<
    GetCommunityById,
    GetCommunityByIdVariables
  >(GET_COMMUNITY_BY_ID, {
    variables: { communityId: communityId! },
    skip: !communityId,
  });

  return { ...useQueryVariables, communityId };
};
