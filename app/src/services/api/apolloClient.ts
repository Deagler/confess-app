import urljoin from 'url-join';
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { typeDefs } from '../../common/graphql/localSchema';
import { resolvers } from '../../common/graphql/localResolvers';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { gql } from 'apollo-boost';
import { firebaseApp } from '../firebase';

const cache = new InMemoryCache();

const authLink = setContext(async (req, { headers }) => {
  const currentUser = firebaseApp.auth().currentUser;
  if (!currentUser) {
    return;
  }

  const token = await currentUser.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloHttpLink = new HttpLink({
  uri: urljoin(process.env.REACT_APP_ENDPOINT_URL || '', 'graph'),
});
export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  // in future could use apollo-cache-persist for persistence of the cache
  cache,
  link: authLink.concat(apolloHttpLink),
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

export const refreshApolloAuthentication = () => {
  apolloClient.link = authLink.concat(apolloHttpLink);
};

// Define default values for local state here
async function writeInitialData() {
  cache.writeQuery({
    query: gql`
      query getLocalState {
        authState {
          accessToken
        }
        localUser {
          id
          communityUsername
          firstName
          lastName
          email
          community {
            id
            name
            abbreviation
          }
        }
      }
    `,
    data: {
      authState: localStorage.getItem('authState')
        ? JSON.parse(localStorage.getItem('authState')!)
        : null,
      localUser: null,
    },
  });
}

writeInitialData();

apolloClient.onResetStore(writeInitialData);
