interface ApprovalInfo {
  approver: User;
  approvalTimestamp: number;
}

export type FirestoreDocRef<T> =
  | T
  | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

export type NullableField<T> = T | null;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  community: NullableField<FirestoreDocRef<Community>>;
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
  approvalInfo: NullableField<ApprovalInfo>;
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
  author: NullableField<FirestoreDocRef<User>>;
  content: string;
  totalLikes: number;
  likes: User[];
}
