import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GetLocalUser } from '../types/GetLocalUser';
import { GET_LOCAL_USER } from '../common/graphql/localState';
import { FullPageLoader } from '../components/FullPageLoader';

const SecureRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const { data, loading } = useQuery<GetLocalUser>(GET_LOCAL_USER, {
    fetchPolicy: 'network-only',
  });

  const isAdmin: boolean = !!data?.localUser?.isAdmin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <FullPageLoader />;
        }

        if (!isAdmin) {
          return <Redirect to="/landing" />;
        }

        // authenticated
        return <Component {...props} />;
      }}
    />
  );
};

export default SecureRoute;
