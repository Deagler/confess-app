export interface Post {
  id: string;
  creationTimestamp: number;
  authorId: string;
  title: string;
  content: string;
  approvalInfo?: {
    approverId: string;
    approvalTimestamp: number;
  };
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
