import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// import { query as OrganisationUsersQuery } from 'hocs/queries/withOrganisationUsers';

export const mutation = gql`
  mutation addUsersToCommunity (
    $communityId: ID!
    $input: AddUsersToOrganisationInput!
  ) {
    community: addUsersToOrganisation(
      id: $communityId
      input: $input
    ) {
      id
      nusers
      nack
      nconfirm
    }
  }
`;

export default graphql(mutation,
  {
    props: ({ mutate, ownProps }) => ({
      addUsersToCommunity: (users, message) => mutate({
        variables: {
          communityId: ownProps.communityId,
          input: { users, message }
        },
      }),
    }),

  }
);
