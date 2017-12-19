import gql from 'graphql-tag'
import RegistrationFragment from 'fragments/Registration'

export default gql`
  fragment CommunityRegistrationFragment on Organisation {
    id
    registration {
      ...RegistrationFragment
    }
  }
  ${RegistrationFragment}
`;
