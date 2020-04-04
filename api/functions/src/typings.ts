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
  likeRefs: Array<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
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
  // TODO: Create separate types for API types and database types
  author:
    | User
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  content: string;
  totalLikes: number;
  likes: User[];
}
