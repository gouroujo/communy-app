import gql from 'graphql-tag';
import UserFragment from 'fragments/User';

export default gql`
  fragment CurrentUserFragment on User {
    ...UserFragment
    registrations {
      id
      role
      ack
      confirm
      organisation {
        id
        title
        cover
        logo
      }
    }
  }
  ${UserFragment}
`;
