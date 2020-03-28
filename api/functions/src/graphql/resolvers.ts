import { queryResolvers } from "./resolvers/query";
import { postMutations } from "./mutations/post";

const resolvers = {
  Query: queryResolvers,
  Mutation: {
    ...postMutations
  }
};

export default resolvers;
