interface ApprovalInfo {
  approver: User;
  approvalTimestamp: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  communityUsername: string;
  community: Community;
}

export interface Post {
  id: string;
  creationTimestamp: number;
  author: User;
  authorAlias?: string;
  channel: string;
  title: string;
  content: string;
  isApproved: boolean;
  approvalInfo: ApprovalInfo | null;
  totalLikes: number;
  likes: User[];
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
  author: User;
  content: string;
  totalLikes: number;
  likes: User[];
}
