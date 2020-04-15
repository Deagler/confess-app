import { Post } from '../../typings';

export type FirebaseDocumentSnapshot =
  | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  | FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>;

export const addIdToDoc = (firestoreDoc: FirebaseDocumentSnapshot): any => {
  const data = firestoreDoc.data();
  if (!data || !firestoreDoc.exists) {
    return null;
  }
  data.id = firestoreDoc.id;
  return data;
};

export const addIsOP = (userId: string, post: Post) => {
  const isOP = !!userId && userId === post?.authorRef?.id;
  post.isOriginalPoster = isOP;

  return post;
};
