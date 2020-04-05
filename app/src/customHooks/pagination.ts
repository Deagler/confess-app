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

// TODO: Refactor these into a single hook to reduce duplicate code
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

export const usePaginatedUnapprovedPostsQuery = () => {
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const { loading, data, error, fetchMore, refetch } = useQuery<
    GetCommunityUnapprovedPosts,
    GetCommunityUnapprovedPostsVariables
  >(GET_COMMUNITY_UNAPPROVED_POSTS, {
    variables: feedVariables,
  });

  const fetchMorePosts = async (e: CustomEvent<void>) => {
    await fetchMore({
      query: GET_COMMUNITY_UNAPPROVED_POSTS,
      variables: {
        ...feedVariables,
        cursor: data?.community?.unapprovedPosts.cursor,
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

  return { data, loading, error, hasMorePosts, fetchMorePosts, refetch };
};

export const usePaginatedPostQuery = (postId: string) => {
  const COMMENT_PAGE_LIMIT = 3;

  const postVariables: GetPostVariables = {
    // TODO: get community id from somewhere
    communityId: 'HW6lY4kJOpqSpL39hbUV',
    postId,
    // TODO: Connect sorting to UI
    sortCommentsBy: {
      property: 'creationTimestamp',
      direction: Direction.ASC,
    },
    commentsLimit: COMMENT_PAGE_LIMIT,
  };

  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);

  const { data, loading, error, fetchMore, updateQuery } = useQuery<
    GetPost,
    GetPostVariables
  >(GET_POST_BY_ID, {
    variables: postVariables,
  });

  const fetchMoreComments = async (e: CustomEvent<void>) => {
    await fetchMore({
      query: GET_POST_COMMENTS_ONLY,
      variables: {
        ...postVariables,
        commentsCursor: data?.post?.comments?.cursor,
      },
      // Update the cache with the newly fetched results
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newComments = fetchMoreResult?.post?.comments?.items;

        // If a full page hasn't been returned we have reached the end
        if (newComments?.length !== COMMENT_PAGE_LIMIT) {
          setHasMoreComments(false);
        }

        // cannot modify previousResult as Apollo uses this to detect changes to trigger re-renders
        return update(previousResult, {
          post: {
            comments: {
              items: { $push: newComments! },
              cursor: { $set: fetchMoreResult?.post?.comments.cursor! },
            },
          },
        });
      },
    });

    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

  return {
    data,
    loading,
    error,
    hasMoreComments,
    fetchMoreComments,
    updateQuery,
  };
};
