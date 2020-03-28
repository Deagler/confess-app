import { gql } from "apollo-server-express";

export interface Post {
  id: string;
  creationTimestamp: number;
  authorId: string;
  title: string;
  content: string;
  approvalInfo?: {
    approverId: string;
    approvalTimestamp: number;
  }
  totalLikes: number;
  likedByIds: string[];
  totalComments: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  creationTimestamp: number;
  authorId: string;
  content: string;
  totalLikes: number;
  likedByIds: string[];
}

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

  type Post {
    id: ID!
    creationTimestamp: Int!
    authorId: String!
    title: String!
    content: String!
    approvalInfo: ApprovalInfo
    totalLikes: Int!
    likedByIds: [String]!
    totalComments: Int!
    comments: [Comment]!
  }

  type Query {
    post(id: ID!): Post
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
    post: User
  }

  type Mutation {
    createPost(authorId: String!, title: String!, content: String!): CreatePostResponse
  }
`;

export default typeDefs;
