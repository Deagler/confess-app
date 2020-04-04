import { gql } from 'apollo-boost';

export const GET_COMMUNITY_UNAPPROVED_POSTS = gql`
  query GetCommunityUnapprovedPosts($id: ID!) {
    community(id: $id) {
      id
      unapprovedPosts {
        id
        title
        authorAlias
        creationTimestamp
        content
      }
    }
  }
`;

export const APPROVE_POST = gql`
  mutation ApprovePost($communityId: String!, $postId: String!) {
    approvePost(communityId: $communityId, postId: $postId) {
      code
      success
      message
    }
  }
`;

export const REJECT_POST = gql`
  mutation RejectPost(
    $communityId: String!
    $postId: String!
    $moderatorId: String!
    $reason: String
  ) {
    rejectPost(
      communityId: $communityId
      postId: $postId
      moderatorId: $moderatorId
      reason: $reason
    ) {
      code
      success
      message
    }
  }
`;
