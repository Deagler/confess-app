import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type ApprovalInfo {
    approver: User!
    approvalTimestamp: Int!
  }

  type User {
    id: ID!
    communityUsername: String!
    firstName: String!
    lastName: String!
    email: String!
    community: Community
  }

  type Comment {
    id: ID!
    creationTimestamp: Int!
    author: User!
    content: String!
    totalLikes: Int!
    likes: [User]!
  }

  type Community {
    id: ID!
    name: String!
    abbreviation: String!
    feed: [Post]!
    unapprovedPosts: [Post]!
    channels: [Channel]!
  }

  type Channel {
    id: ID!
    name: String!
    icon: String
  }

  type Post {
    id: ID!
    creationTimestamp: Int!
    author: User!
    authorAlias: String

    channel: String!
    title: String!
    content: String!

    isApproved: Boolean!
    approvalInfo: ApprovalInfo

    totalLikes: Int!
    likes: [User]!
    totalComments: Int!
    comments: [Comment]!
  }

  type Query {
    post(communityId: ID!, postId: ID!): Post
    user(id: ID!): User
    community(id: ID!): Community
    communities: [Community]!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type CreatePostResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    post: Post
  }

  type AttemptSignupResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    user: User
  }

  type CreateCommentResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type Mutation {
    submitPostForApproval(
      communityId: String!
      channel: String!
      title: String!
      content: String!
      authorAlias: String
    ): CreatePostResponse
    attemptSignUp(firstName: String, lastName: String): AttemptSignupResponse
    submitComment(
      communityId: String!
      postId: String!
      content: String!
    ): CreateCommentResponse
  }
`;

export default typeDefs;
