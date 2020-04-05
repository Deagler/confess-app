import { SortByInput } from '../typings';

export interface PaginationResults {
  items: any[];
  newCursor?: string;
}

export const paginateResults = async (
  collectionReference,
  sortBy?: SortByInput,
  cursor?: string,
  pageSize?: number
): Promise<PaginationResults> => {
  let query = collectionReference
    .orderBy(sortBy?.property || 'totalLikes', sortBy?.direction || 'desc')
    .limit(pageSize || 10);

  // if request has cursor, update query to retrieve items beyond the cursor
  if (cursor) {
    const lastComment = await collectionReference.doc(cursor).get();
    query = query.startAfter(lastComment);
  }

  const queryResults = await query.get();

  // if there are no more documents return an empty list and the previous cursor
  if (queryResults.empty) {
    return { items: [], newCursor: cursor };
  }

  // id of the final document is used for the pagination cursor
  const newCursor = queryResults.docs[queryResults.docs.length - 1].ref.id;

  return { items: queryResults.docs, newCursor };
};
