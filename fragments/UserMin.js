import gql from 'graphql-tag';

export default gql`
  fragment UserMinFragment on User {
    id
    fullname
    email
    avatar
  }
`;
