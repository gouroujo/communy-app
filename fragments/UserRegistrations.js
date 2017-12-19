import gql from 'graphql-tag'
import RegistrationFragment from 'fragments/Registration'

export default gql`
  fragment UserRegistrationsFragment on User {
    id
    registrations {
      ...RegistrationFragment
    }
  }
  ${RegistrationFragment}
`;
