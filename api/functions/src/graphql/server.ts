import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import typeDefs from "./schema";
import resolvers from "./resolvers";


export function ConstructGraphQLServer() {
  const app = express();
  app.use(cors());
  app.options("*");
 
  // app.use(validateFirebaseIdToken);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx => {
      // Debug the request context here if needed.
      return ctx;
    }
  });

  apolloServer.applyMiddleware({ app, path: "/", cors: true });
  return app;
}