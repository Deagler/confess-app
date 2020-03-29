import urljoin from 'url-join';
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { typeDefs } from '../../common/graphql/localSchema';
import { resolvers } from '../../common/graphql/localResolvers';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  // in future could use apollo-cache-persist for persistence of the cache
  cache,
  link: new HttpLink({
    uri: urljoin(process.env.REACT_APP_ENDPOINT_URL || '', 'graph'),
  }),
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

// Define default values for local state here
cache.writeData({
  data: {
    selectedCommunity: localStorage.getItem('selectedCommunity') || '',
  },
});
