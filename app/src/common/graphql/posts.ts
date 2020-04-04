import { gql } from 'apollo-boost';

export const GET_POST_BY_ID = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      creationTimestamp
      authorAlias
      title
      content
      totalLikes
      totalComments
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
