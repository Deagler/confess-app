import { authResolvers } from './mutations/auth';
import { commentMutations } from './mutations/comment';
import { postMutations } from './mutations/post';
import { communityResolvers } from './resolvers/community';
import { postResolvers } from './resolvers/post';
import { queryResolvers } from './resolvers/query';
import { userResolvers } from './resolvers/user';

const resolvers = {
  Query: queryResolvers,
  Community: communityResolvers,
  User: userResolvers,
  Post: postResolvers,
  Mutation: {
    ...authResolvers,
    ...postMutations,
    ...commentMutations,
  },
};

export default resolvers;
