import { gql } from 'apollo-boost';

export const GET_COMMUNITY_UNAPPROVED_POSTS = gql`
  query GetCommunityUnapprovedPosts(
    $id: ID!
    $sortBy: SortByInput
    $cursor: String
    $limit: Int
  ) {
    selectedCommunity @client {
      id @export(as: "id")
    }
    community(id: $id) {
      id
      unapprovedPosts(sortBy: $sortBy, cursor: $cursor, limit: $limit) {
        items {
          id
          title
          authorAlias
          creationTimestamp
          content
        }
        cursor
      }
    }
  }
`;

export const APPROVE_POST = gql`
  mutation ApprovePost($communityId: ID!, $postId: ID!) {
    approvePost(communityId: $communityId, postId: $postId) {
      code
      success
      message
    }
  }
`;

export const REJECT_POST = gql`
  mutation RejectPost($communityId: ID!, $postId: ID!, $reason: String) {
    rejectPost(communityId: $communityId, postId: $postId, reason: $reason) {
      code
      success
      message
    }
  }
`;
