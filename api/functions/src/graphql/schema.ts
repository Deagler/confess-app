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

  enum Direction {
    ASC
    DESC
  }

  input SortByInput {
    property: String!
    direction: Direction!
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
    author: User
    content: String!
    totalLikes: Int!
    likes: [User]!
  }

  type CommentConnection {
    items: [Comment]!
    cursor: String
  }

  type PostConnection {
    items: [Post!]!
    cursor: String
  }

  type Community {
    id: ID!
    name: String!
    abbreviation: String!
    feed(sortBy: SortByInput, limit: Int, cursor: String): PostConnection!
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
    authorAlias: String

    channel: String!
    title: String!
    content: String!

    moderationStatus: ModerationStatus!
    moderationInfo: ModerationInfo

    totalLikes: Int!
    likes: [User]!
    isLikedByUser: Boolean!
    totalComments: Int!
    comments(
      sortBy: SortByInput
      limit: Int
      cursor: String
    ): CommentConnection!
    communityId: String
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

  type PostUpdatedResponse implements MutationResponse {
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
      communityId: ID!
      channel: String!
      title: String!
      content: String!
      authorAlias: String
    ): PostUpdatedResponse

    attemptSignUp(firstName: String, lastName: String): AttemptSignupResponse

    submitComment(
      communityId: ID!
      postId: ID!
      content: String!
    ): CreateCommentResponse

    approvePost(communityId: ID!, postId: ID!): ApprovePostResponse

    rejectPost(
      communityId: ID!
      postId: ID!
      reason: String
    ): RejectPostResponse

    toggleLikePost(communityId: ID!, postId: ID!): PostUpdatedResponse
  }
`;

export default typeDefs;
