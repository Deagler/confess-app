export enum ModerationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

interface ModerationInfo {
  moderator: User;
  lastUpdated: number;
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
  moderationStatus: ModerationStatus;
  moderationInfo: ModerationInfo | null;
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
  author:
    | User
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  content: string;
  totalLikes: number;
  likes: User[];
}
