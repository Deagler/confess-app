import { ApolloError } from 'apollo-server-express';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Comment, User } from '../../typings';
import { addIdToDoc } from './utils';

export const commentResolvers = {
  async author(parent: any) {
    try {
      const author = await parent.authorRef.get();

      if (!author.exists) {
        throw new ApolloError(`user with id ${parent.authorRef.id} not found`);
      }

      return addIdToDoc(author) as User | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
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
    const userHasLiked = await commentData.likeRefs.some(
      (likeRef) => likeRef.id == userRecord.uid
    );

    return userHasLiked;
  },
};
