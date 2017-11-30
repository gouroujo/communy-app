import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const mutation = gql`
  mutation editCommunity(
    $communityId: ID!
    $input: OrganisationInput!
  ) {
    community: editOrganisation (id: $communityId, input: $input) {
      id
      title
      description
      type
      categories
    }
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => ({
    editCommunity: (data) => {
      return mutate({
        variables: {
          input: data,
          communityId: ownProps.communityId
        },
      })
    },
  }),
});
