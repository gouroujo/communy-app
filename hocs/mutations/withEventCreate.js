import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// import { fragment as EventViewFragment } from 'containers/Event/Container'

export const mutation = gql`
  mutation createEvent(
    $input: EventCreateInput!
    $communityId: ID!
  ) {
    event: createEvent(
      organisationId: $communityId
      input: $input
    ) {
      id
      startTime
      endTime
      title
      description
    }
  }
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => ({
    createEvent: (event) => {
      return mutate({
        variables: {
          communityId: ownProps.communityId,
          input: event,
        },
      })
    }
  }),
});
