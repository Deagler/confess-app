interface ApprovalInfo {
  approver: User;
  approvalTimestamp: number;
}

export type FirestoreDocRef = FirebaseFirestore.DocumentReference<
  FirebaseFirestore.DocumentData
>;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  communityRef: FirestoreDocRef | null;
  community?: Community | null;
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
  // TODO: Create separate types for API types and database types
  authorRef: FirestoreDocRef | null;
  author?: User | null;
  content: string;
  totalLikes: number;
  likes: User[];
}
