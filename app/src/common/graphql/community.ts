import { gql } from 'apollo-boost';

export const GET_COMMUNITY_POSTS = gql`
  query GetCommunityPosts(
    $id: ID!
    $sortBy: SortByInput
    $cursor: String
    $limit: Int
  ) {
    community(id: $id) {
      id
      feed(sortBy: $sortBy, cursor: $cursor, limit: $limit) {
        items {
          id
          title
          authorAlias
          creationTimestamp
          content
          totalLikes
          totalComments
          isLikedByUser
        }
        cursor
      }
    }
  }
`;
