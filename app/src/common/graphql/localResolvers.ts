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
  // Once retrieving/updating local state becomes more complex 
  // write resolvers for those queries/mutations in here 
}

export const resolvers = {};