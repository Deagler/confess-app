export interface Post {
  id: string;
  creationTimestamp: number;
  authorId: string;
  authorName?: string;
  channel: string;
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

export interface Community {
  id: string;
  title: string;
  abbreviation: string;
}

export interface Comment {
  id: string;
  creationTimestamp: number;
  authorId: string;
  content: string;
  totalLikes: number;
  likedByIds: string[];
}
