import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type ApprovalInfo {
    approverId: String!
    approvalTimestamp: Int!
  }

  type Comment {
    id: ID!
    creationTimestamp: Int!
    authorId: String!
    content: String!
    totalLikes: Int!
    likedByIds: [String]!
  }

  type Community {
    id: ID!
    name: String!
    abbreviation: String!
    feed: [Post]!
  }

  type Post {
    id: ID!
    creationTimestamp: Int!
    authorId: String!
    authorName: String!

    channel: String!
    title: String!
    content: String!

    isApproved: Boolean!
    approvalInfo: ApprovalInfo

    totalLikes: Int!
    likedByIds: [String]!
    totalComments: Int!
    comments: [Comment]!
  }

  type Query {
    post(communityId: ID!, postId: ID!): Post
    community(id: ID!): Community
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

  type Mutation {
    submitPostForApproval(
      communityId: String!
      channel: String!
      title: String!
      content: String!
      authorName: String
    ): CreatePostResponse
  }
`;

export default typeDefs;
