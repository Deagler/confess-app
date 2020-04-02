import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { attachFirebaseIdToken } from '../utils/auth';
import resolvers from './resolvers';
import typeDefs from './schema';

export function ConstructGraphQLServer() {
  const app = express();
  app.use(cors());
  app.options('*');

  app.use(attachFirebaseIdToken);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (ctx) => {
      // Debug the request context here if needed.
      return ctx;
    },
  });

  apolloServer.applyMiddleware({ app, path: '/', cors: true });
  return app;
}
