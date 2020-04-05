export const addIdToDoc = (firestoreDoc) => {
  const data = firestoreDoc.data();
  if (!data || !firestoreDoc.exists) {
    return null;
  }
  data.id = firestoreDoc.id;
  return data;
};
