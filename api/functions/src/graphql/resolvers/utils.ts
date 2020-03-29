export const addIdToDoc = (firestoreDoc) => {
  const data = firestoreDoc.data();
  if (!data) {
    return {};
  }
  data.id = firestoreDoc.id;
  return data;
};
