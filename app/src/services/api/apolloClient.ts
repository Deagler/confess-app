import urljoin from 'url-join';
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-boost';
import { typeDefs } from '../../common/graphql/localSchema';
import { resolvers } from '../../common/graphql/localResolvers';

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  // in future could use apollo-cache-persist for persistence of the cache
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: urljoin(process.env.REACT_APP_ENDPOINT_URL || '', 'graph'),
    // TODO: Just an example of how to store a cookie
    headers: { authorization: localStorage.getItem('token') },
  }),
  typeDefs,
  resolvers,
});
