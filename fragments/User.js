import gql from 'graphql-tag';

export default gql`
  fragment UserFragment on User {
    id
    firstname
    lastname
    fullname
    norganisations
    email
    hasCredentials
    nunreadMessage
    avatar
    phone1
    birthday
    birthplace
    phone2
  }
`;
