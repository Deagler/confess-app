import { SortByInput } from '../typings';

export interface PaginationResults {
  items: any[];
  newCursorDocumentId?: string;
}

export const paginateResults = async (
  collectionQuery,
  sortBy?: SortByInput,
  cursorDocument?: FirebaseFirestore.DocumentSnapshot,
  pageSize?: number
): Promise<PaginationResults> => {
  let query = collectionQuery
    .orderBy(sortBy?.property || 'totalLikes', sortBy?.direction || 'desc')
    .limit(pageSize || 10);

  // if request has cursor, update query to retrieve items beyond the cursor
  if (cursorDocument) {
    console.log('yeet ');
    query = query.startAfter(cursorDocument);
  }

  const queryResults = await query.get();

  // if there are no more documents return an empty list and the previous cursor
  if (queryResults.empty) {
    return { items: [], newCursorDocumentId: cursorDocument?.id };
  }

  // id of the final document is used for the pagination cursor
  const newCursor = queryResults.docs[queryResults.docs.length - 1].ref.id;

  return { items: queryResults.docs, newCursorDocumentId: newCursor };
};
