import { commentMutations } from './mutations/comment';
import { postMutations } from './mutations/post';
import { communityResolvers } from './resolvers/community';
import { queryResolvers } from './resolvers/query';

const resolvers = {
  Query: queryResolvers,
  Community: communityResolvers,
  Mutation: {
    ...postMutations,
    ...commentMutations,
  },
};

export default resolvers;
