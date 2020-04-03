import urljoin from 'url-join';
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { typeDefs } from '../../common/graphql/localSchema';
import { resolvers } from '../../common/graphql/localResolvers';
import { HttpLink } from 'apollo-link-http';
import { gql } from 'apollo-boost';

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
async function writeInitialData() {
  cache.writeQuery({
    query: gql`
      query getLocalState {
        selectedCommunity
        authState {
          accessToken
        }
      }
    `,
    data: {
      selectedCommunity: localStorage.getItem('selectedCommunity') || '',
      authState: localStorage.getItem('authState')
        ? JSON.parse(localStorage.getItem('authState')!)
        : null,
    },
  });
}

writeInitialData();

apolloClient.onResetStore(writeInitialData);
