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
    displayName: String
    email: String!
    community: Community
    isAdmin: Boolean
    starCount: Int
  }

  type Comment {
    id: ID!
    creationTimestamp: Int!
    author: User
    content: String!
    totalLikes: Int!
    likes: [User]!
    isCommentLikedByUser: Boolean!
    communityId: String
    postId: String
    isStarred: Boolean
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
    imageURI: String!
    isEnabled: Boolean!
    feed(
      sortBy: SortByInput
      limit: Int
      cursor: String
      channelId: ID
    ): PostConnection!
    unapprovedPosts(
      sortBy: SortByInput
      limit: Int
      cursor: String
    ): PostConnection!
    channels: [Channel]!
  }

  type Channel {
    id: ID!
    name: String!
    icon: String
  }

  type Post {
    id: ID!
    postNumber: Int
    creationTimestamp: Int!
    authorAlias: String

    channelId: String!
    title: String!
    content: String!

    moderationStatus: ModerationStatus!
    moderationInfo: ModerationInfo

    isOriginalPoster: Boolean!
    totalLikes: Int!
    likes: [User]!
    isLikedByUser: Boolean!
    totalComments: Int!
    comments(
      sortBy: SortByInput
      limit: Int
      cursor: String
    ): CommentConnection!
  }

  type Query {
    post(communityId: ID!, postId: ID!): Post
    user(id: ID!, disableSafeMode: Boolean): User
    community(id: ID!): Community
    communities: [Community]!
    comment(communityId: ID!, postId: ID!, commentId: ID!): Comment
    landingPosts: [Post!]!
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

  type CommentUpdatedResponse implements MutationResponse {
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
      channelId: String!
      title: String!
      content: String!
      authorAlias: String
    ): PostUpdatedResponse

    attemptSignUp(displayName: String!): AttemptSignupResponse

    submitComment(
      communityId: ID!
      postId: ID!
      content: String!
    ): CommentUpdatedResponse

    approvePost(communityId: ID!, postId: ID!): ApprovePostResponse

    rejectPost(
      communityId: ID!
      postId: ID!
      reason: String
    ): RejectPostResponse

    toggleLikePost(communityId: ID!, postId: ID!): PostUpdatedResponse

    toggleLikeComment(
      communityId: ID!
      postId: ID!
      commentId: ID!
    ): CommentUpdatedResponse

    toggleStarComment(
      communityId: ID!
      postId: ID!
      commentId: ID!
    ): CommentUpdatedResponse
  }
`;

export default typeDefs;
