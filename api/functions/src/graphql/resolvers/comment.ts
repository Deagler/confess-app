import { ApolloError } from 'apollo-server-express';
import { User } from '../../typings';
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
};
