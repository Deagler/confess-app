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
