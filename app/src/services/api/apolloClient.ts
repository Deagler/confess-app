import ApolloClient from 'apollo-boost';
import urljoin from 'url-join';

export const apolloClient = new ApolloClient({
  uri: urljoin(process.env.REACT_APP_ENDPOINT_URL!, 'graph'),
});
