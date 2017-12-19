import gql from 'graphql-tag'
import UserFragment from 'fragments/User'
import RegistrationFragment from 'fragments/Registration'

export default gql`
  fragment CurrentUserFragment on User {
    ...UserFragment
    registrations {
      ...RegistrationFragment
      organisation {
        id
        title
        cover
        logo
      }
    }
  }
  ${RegistrationFragment}
  ${UserFragment}
`;
