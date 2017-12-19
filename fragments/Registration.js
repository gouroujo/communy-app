import gql from 'graphql-tag'

export default gql`
  fragment RegistrationFragment on Registration {
    id
    ack
    confirm
    role
    permissions
  }
`;
