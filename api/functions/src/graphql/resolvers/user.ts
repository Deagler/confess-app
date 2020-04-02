import { ApolloError } from 'apollo-server-express';
import { firebaseApp } from '../../firebase';
import { Community, User } from '../../typings';
import { addIdToDoc } from './utils';

export const userResolvers = {
  async community(parent: User, args) {
    try {
      if (!parent.communityRef) {
        return null;
      }

      return addIdToDoc(await parent.communityRef.get()) as
        | Community
        | undefined;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
