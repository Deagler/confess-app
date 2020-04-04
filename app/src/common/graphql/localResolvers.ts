import { ApolloCache } from 'apollo-cache';

import { authMutationResolvers } from './resolvers/auth';
import { queryResolvers } from './resolvers/query';

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}



export const resolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...authMutationResolvers,
  },
};
