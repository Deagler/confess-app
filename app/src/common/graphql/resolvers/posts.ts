import { ApolloClient, NormalizedCacheObject, gql } from 'apollo-boost';
import { SERVER_TOGGLE_LIKE_POST } from '../posts';
const postFragmentLikeStatus = gql`
  fragment postLikeStatus on Post {
    id
    totalLikes
    isLikedByUser
  }
`;
async function clientToggleLikePost(
  _,
  { communityId, postId },
  { cache, client }
) {
  const apolloClient: ApolloClient<NormalizedCacheObject> = client;
  const cachedPostId = `Post:${postId}`;

  const likeStatus = await apolloClient.readFragment({
    id: cachedPostId,
    fragment: postFragmentLikeStatus,
  });

  await apolloClient.writeFragment({
    id: cachedPostId,
    fragment: postFragmentLikeStatus,
    data: {
      id: postId,
      isLikedByUser: !likeStatus.isLikedByUser,
      totalLikes: likeStatus.isLikedByUser
        ? likeStatus.totalLikes - 1
        : likeStatus.totalLikes + 1,
      __typename: 'Post',
    },
  });

  const data = await apolloClient.mutate({
    mutation: SERVER_TOGGLE_LIKE_POST,
    variables: {
      communityId,
      postId,
    },
  });

  return data.data.toggleLikePost;
}
export const postMutationResolvers = {
  clientToggleLikePost,
};
