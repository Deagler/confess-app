import { gql } from 'apollo-boost';

export const GET_POST_BY_ID = gql`
  query GetPost(
    $communityId: ID!
    $postId: ID!
    $sortCommentsBy: SortByInput
    $commentsLimit: Int
    $commentsCursor: String
  ) {
    post(communityId: $communityId, postId: $postId) {
      id
      creationTimestamp
      authorAlias
      title
      content
      totalLikes
      totalComments
      comments(
        sortBy: $sortCommentsBy
        limit: $commentsLimit
        cursor: $commentsCursor
      ) {
        items {
          id
          totalLikes
          content
          creationTimestamp
        }
        cursor
      }
    }
  }
`;

export const SUBMIT_POST_FOR_APPROVAL = gql`
  mutation SubmitPostForApproval(
    $communityId: String!
    $channel: String!
    $title: String!
    $content: String!
    $authorAlias: String!
  ) {
    submitPostForApproval(
      communityId: $communityId
      channel: $channel
      title: $title
      content: $content
      authorAlias: $authorAlias
    ) {
      code
      success
      message
      post {
        id
        title
        content
        authorAlias
        moderationStatus
        creationTimestamp
      }
    }
  }
`;

export const GET_COMMUNITY_POSTS = gql`
  query GetCommunityPosts($id: ID!) {
    community(id: $id) {
      id
      feed {
        id
        title
        authorAlias
        creationTimestamp
        content
        totalLikes
        totalComments
      }
    }
  }
`;
