import { ApolloCache } from 'apollo-cache';
import { firebaseApp } from '../../services/firebase';
import { gql } from 'apollo-boost';
import { authResolvers } from './resolvers/auth';

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

export const resolvers = {
  Mutation: {
    ...authResolvers,
  },
};
