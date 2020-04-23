import { gql } from 'apollo-boost';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!, $disableSafeMode: Boolean = false) {
    user(id: $id, disableSafeMode: $disableSafeMode) {
      id
      displayName
      communityUsername
      email
      community {
        id
        name
        abbreviation
        isEnabled
      }
      isAdmin
      starCount
    }
  }
`;
