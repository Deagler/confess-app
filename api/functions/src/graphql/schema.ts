import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum ModerationStatus {
    PENDING
    APPROVED
    REJECTED
  }

  type ModerationInfo {
    moderator: User!
    lastUpdated: Int!
    reason: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    communityUsername: String!
    community: Community!
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

    moderationStatus: ModerationStatus!
    moderationInfo: ModerationInfo

    totalLikes: Int!
    likes: [User]!
    totalComments: Int!
    comments: [Comment]!
  }

  type Query {
    post(communityId: ID!, postId: ID!): Post
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

  type CreateCommentResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type ApprovePostResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type RejectPostResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation {
    submitPostForApproval(
      communityId: String!
      channel: String!
      title: String!
      content: String!
      authorAlias: String
    ): CreatePostResponse

    submitComment(
      communityId: String!
      postId: String!
      content: String!
    ): CreateCommentResponse

    approvePost(
      communityId: String!
      postId: String!
      moderatorId: String!
    ): ApprovePostResponse

    rejectPost(
      communityId: String!
      postId: String!
      moderatorId: String!
      reason: String
    ): RejectPostResponse
  }
`;

export default typeDefs;
