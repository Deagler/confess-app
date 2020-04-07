import { UserInputError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Comment, User } from '../../typings';
import { addIdToDoc } from './utils';

export const commentResolvers = {
  async author(parent: any) {
    const author = await parent.authorRef.get();

    if (!author.exists) {
      throw new UserInputError(`user with id ${parent.authorRef.id} not found`);
    }

    return addIdToDoc(author) as User | undefined;
  },
  async isCommentLikedByUser(parent: any, _, context) {
    // pull user from request context
    const userRecord: UserRecord = context.req.user;

    if (!userRecord) {
      return false;
    }

    const commentData: Comment = parent;
    if (!parent.likeRefs) {
      return false;
    }
    const userHasLiked = commentData.likeRefs.some(
      (likeRef) => likeRef.id == userRecord.uid
    );

    return userHasLiked;
  },
};
