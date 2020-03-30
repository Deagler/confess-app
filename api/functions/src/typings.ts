interface ApprovalInfo {
  approver: any;
  approvalTimestamp: number;
}

export interface Post {
  id: string;
  creationTimestamp: number;
  author: any;
  authorAlias?: string;
  channel: string;
  title: string;
  content: string;
  isApproved: boolean;
  approvalInfo: ApprovalInfo | null;
  totalLikes: number;
  likes: any[];
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
  author: any;
  content: string;
  totalLikes: number;
  likes: any[];
}
