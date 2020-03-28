import admin = require("firebase-admin");
import {
  ApolloError,
  checkForResolveTypeResolver
} from "apollo-server-express";
import { queryResolvers } from "./resolvers/query";
import { postMutations } from "./mutations/post";


const firestore = admin.firestore();



const resolvers = {
  Query: queryResolvers,
  Mutation: {
    ...postMutations
  }
};

export default resolvers;
