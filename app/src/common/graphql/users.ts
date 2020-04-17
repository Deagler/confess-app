import { gql } from 'apollo-boost';

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
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
