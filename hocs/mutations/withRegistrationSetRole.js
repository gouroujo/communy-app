import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RegistrationFragment from 'fragments/Registration'

export const mutation = gql`
  mutation setRegistrationRole (
    $communityId: ID!
    $userId: ID!
    $role: OrganisationRole!
  ) {
    setRoleToRegistration(
      organisationId: $communityId
      userId: $userId
      role: $role
    ) {
      ...RegistrationFragment
    }
  }
  ${RegistrationFragment}
`;

export default graphql(mutation,
  {
    props: ({ mutate, ownProps }) => ({
      setRole: (ev, role) => mutate({
        variables: {
          role: role,
          userId: ownProps.userId,
          communityId: ownProps.communityId
        }
      }),
    }),
  }
);
