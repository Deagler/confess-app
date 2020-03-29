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
    posts: [Post]!
  }

  type Post {
    id: ID!
    creationTimestamp: Int!
    authorId: String!
    authorName: String!
    title: String!
    content: String!
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
    createPost(
      authorId: String!
      title: String!
      content: String!
    ): CreatePostResponse
  }
`;

export default typeDefs;
