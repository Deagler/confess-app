import { queryResolvers } from "./resolvers/query";
import { postMutations } from "./mutations/post";
import { communityResolvers } from "./resolvers/community";

const resolvers = {
  Query: queryResolvers,
  Community: communityResolvers,
  Mutation: {
    ...postMutations
  }
};

export default resolvers;
