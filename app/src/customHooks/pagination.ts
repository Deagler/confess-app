import { useState } from 'react';
import {
  GetCommunityPostsVariables,
  GetCommunityPosts,
} from '../types/GetCommunityPosts';
import { Direction } from '../types/globalTypes';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMUNITY_POSTS } from '../common/graphql/community';
import update from 'immutability-helper';

const POST_PAGE_LIMIT = 3;

const feedVariables: GetCommunityPostsVariables = {
  // TODO: Get community id from somewhere
  id: 'HW6lY4kJOpqSpL39hbUV',
  sortBy: {
    // TODO: Add sorting to the UI
    property: 'creationTimestamp',
    direction: Direction.DESC,
  },
  limit: POST_PAGE_LIMIT,
};

export const usePaginatedFeedQuery = () => {
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const { loading, data, fetchMore } = useQuery<
    GetCommunityPosts,
    GetCommunityPostsVariables
  >(GET_COMMUNITY_POSTS, {
    variables: feedVariables,
  });

  const fetchMorePosts = async (e: CustomEvent<void>) => {
    await fetchMore({
      query: GET_COMMUNITY_POSTS,
      variables: {
        ...feedVariables,
        cursor: data?.community?.feed.cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult?.community?.feed.items;

        console.log('fetch more res: ' + JSON.stringify(fetchMoreResult));
        // If a full page hasn't been returned we have reached the end
        if (newPosts?.length !== POST_PAGE_LIMIT) {
          setHasMorePosts(false);
        }

        // cannot modify previousResult as Apollo uses this to detect changes to trigger re-renders
        return update(previousResult, {
          community: {
            feed: {
              items: { $push: newPosts! },
              cursor: { $set: fetchMoreResult?.community?.feed.cursor! },
            },
          },
        });
      },
    });
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return { data, loading, hasMorePosts, fetchMorePosts };
};
