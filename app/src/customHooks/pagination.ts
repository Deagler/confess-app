import { useState } from 'react';
import {
  GetCommunityPostsVariables,
  GetCommunityPosts,
} from '../types/GetCommunityPosts';
import { Direction } from '../types/globalTypes';
import { useQuery } from '@apollo/react-hooks';
import { GET_COMMUNITY_POSTS } from '../common/graphql/community';
import update from 'immutability-helper';
import { GetPostVariables, GetPost } from '../types/GetPost';
import {
  GET_POST_BY_ID,
  GET_POST_COMMENTS_ONLY,
} from '../common/graphql/posts';
import {
  GetCommunityUnapprovedPostsVariables,
  GetCommunityUnapprovedPosts,
} from '../types/GetCommunityUnapprovedPosts';
import { GET_COMMUNITY_UNAPPROVED_POSTS } from '../common/graphql/admin';
import { removeDuplicatesById } from '../utils';
import { useSelectedChannel, useSelectedCommunity } from './location';
import { firebaseAnalytics } from '../services/firebase';

// TODO: Refactor these hooks into a single hook to reduce duplicate code

const POST_PAGE_LIMIT = 5;
const COMMENT_PAGE_LIMIT = 5;

export const usePaginatedFeedQuery = () => {
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const communityId = useSelectedCommunity();

  const feedVariables: GetCommunityPostsVariables = {
    id: communityId!,
    sortBy: {
      // TODO: Add sorting to the UI
      property: 'creationTimestamp',
      direction: Direction.DESC,
    },
    limit: POST_PAGE_LIMIT,
    channelId: useSelectedChannel(),
  };

  const useQueryVariables = useQuery<
    GetCommunityPosts,
    GetCommunityPostsVariables
  >(GET_COMMUNITY_POSTS, {
    variables: feedVariables,
    skip: !communityId,
    fetchPolicy: 'network-only',
  });

  const fetchMorePosts = async (e: CustomEvent<void>) => {
    await useQueryVariables.fetchMore({
      query: GET_COMMUNITY_POSTS,
      variables: {
        ...feedVariables,
        cursor: useQueryVariables.data?.community?.feed.cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult?.community?.feed.items;

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

  return {
    ...useQueryVariables,
    hasMorePosts,
    fetchMorePosts,
    setHasMorePosts,
  };
};

export const usePaginatedUnapprovedPostsQuery = () => {
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const communityId = useSelectedCommunity();

  const feedVariables: GetCommunityPostsVariables = {
    id: communityId!,
    sortBy: {
      // TODO: Add sorting to the UI
      property: 'creationTimestamp',
      direction: Direction.DESC,
    },
    limit: POST_PAGE_LIMIT,
  };

  const useQueryVariables = useQuery<
    GetCommunityUnapprovedPosts,
    GetCommunityUnapprovedPostsVariables
  >(GET_COMMUNITY_UNAPPROVED_POSTS, {
    variables: feedVariables,
    skip: !communityId,
  });

  const fetchMorePosts = async (e: CustomEvent<void>) => {
    firebaseAnalytics.logEvent('fetch_more_posts', {
      ...feedVariables,
    });
    await useQueryVariables.fetchMore({
      query: GET_COMMUNITY_UNAPPROVED_POSTS,
      variables: {
        ...feedVariables,
        cursor: useQueryVariables.data?.community?.unapprovedPosts.cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newPosts = fetchMoreResult?.community?.unapprovedPosts.items;

        // If a full page hasn't been returned we have reached the end
        if (newPosts?.length !== POST_PAGE_LIMIT) {
          setHasMorePosts(false);
        }

        // cannot modify previousResult as Apollo uses this to detect changes to trigger re-renders
        return update(previousResult, {
          community: {
            unapprovedPosts: {
              items: { $push: newPosts! },
              cursor: {
                $set: fetchMoreResult?.community?.unapprovedPosts.cursor!,
              },
            },
          },
        });
      },
    });
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return { ...useQueryVariables, hasMorePosts, fetchMorePosts };
};

export const usePaginatedPostQuery = (postId: string) => {
  const communityId = useSelectedCommunity();

  const postVariables: GetPostVariables = {
    communityId: communityId!,
    postId,
    // TODO: Connect sorting to UI
    sortCommentsBy: {
      property: 'creationTimestamp',
      direction: Direction.ASC,
    },
    commentsLimit: COMMENT_PAGE_LIMIT,
  };

  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);

  const useQueryVariables = useQuery<GetPost, GetPostVariables>(
    GET_POST_BY_ID,
    {
      variables: postVariables,
      skip: !communityId,
    }
  );

  const fetchMoreComments = async (e: CustomEvent<void>) => {
    firebaseAnalytics.logEvent('fetch_more_comments', {
      ...postVariables,
    });
    await useQueryVariables.fetchMore({
      query: GET_POST_COMMENTS_ONLY,
      variables: {
        ...postVariables,
        commentsCursor: useQueryVariables.data?.post?.comments?.cursor,
      },
      // Update the cache with the newly fetched results
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newComments = fetchMoreResult?.post?.comments?.items;
        const previousComments = previousResult.post?.comments.items;
        const uniqueComments = removeDuplicatesById([
          ...previousComments!,
          ...newComments!,
        ]);

        // If a full page hasn't been returned we have reached the end
        if (newComments?.length !== COMMENT_PAGE_LIMIT) {
          setHasMoreComments(false);
        }

        // cannot modify previousResult as Apollo uses this to detect changes to trigger re-renders
        return update(previousResult, {
          post: {
            comments: {
              items: { $set: uniqueComments },
              cursor: { $set: fetchMoreResult?.post?.comments.cursor! },
            },
          },
        });
      },
    });

    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return { ...useQueryVariables, hasMoreComments, fetchMoreComments };
};
