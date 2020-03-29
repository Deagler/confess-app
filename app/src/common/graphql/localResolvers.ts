import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";

type ResolverFn = (
  parent: any, 
  args: any, 
  { cache } : { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // Once retrieving local state becomes more complex we will
  // have to write resolvers for those queries in here 
}

export const resolvers = {};