import { commentMutations } from './mutations/comment';
import { postMutations } from './mutations/post';
import { communityResolvers } from './resolvers/community';
import { queryResolvers } from './resolvers/query';
import { authResolvers } from './mutations/auth';
import { userResolvers } from './resolvers/user';

const resolvers = {
  Query: queryResolvers,
  Community: communityResolvers,
  User: userResolvers,
  Mutation: {
    ...authResolvers,
    ...postMutations,
    ...commentMutations,
  },
};

export default resolvers;
