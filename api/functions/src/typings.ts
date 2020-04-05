export enum ModerationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

interface ModerationInfo {
  moderator: User;
  lastUpdated: number;
}

export type FirestoreDocRef = FirebaseFirestore.DocumentReference<
  FirebaseFirestore.DocumentData
>;

export interface User {
  id: string;
  communityUsername: string;
  firstName: string;
  lastName: string;
  email: string;
  communityRef: FirestoreDocRef | null;
  community?: Community | null;
}

export interface Post {
  id: string;
  creationTimestamp: number;
  authorRef: FirestoreDocRef;
  author: User;
  authorAlias?: string;
  channel: string;
  title: string;
  content: string;
  moderationStatus: ModerationStatus;
  moderationInfo: ModerationInfo | null;
  totalLikes: number;
  likeRefs: Array<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
  totalComments: number;
  comments: Comment[];
  communityId?: string;
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
  content: string;
  totalLikes: number;
  likes: User[];
}

export interface CommentsInput {
  sortBy?: SortByInput;
  limit?: number;
  cursor?: string;
}

export interface SortByInput {
  property: string;
  direction: 'asc' | 'desc' | undefined;
}
