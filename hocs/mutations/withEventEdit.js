// import update from 'immutability-helper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import EventFragment from 'fragments/Event';

// import { query as EventsQuery } from 'hocs/queries/withEvents';

export const mutation = gql`
  mutation editEvent(
    $input: EventEditInput!
    $id: ID!
  ) {
    editEvent(
      id: $id
      input: $input
    ) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => ({
    editEvent: (event) => {
      return mutate({
        variables: {
          id: ownProps.eventId,
          input: event,
        },
        // refetchQueries: [
        //   { query: EventsQuery, variables: { organisationId: ownProps.organisationId },},
        // ],
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   createEvent: {
        //     __typename: 'Event',
        //     ...event,
        //     id: null,
        //     nusers: 0,
        //     answer: null,
        //     address: null,
        //     organisation: null
        //   }
        // },
        // updateQueries: {
        //   getOrganisationEvents: (prev, { mutationResult }) => {
        //     const newEvent = mutationResult.data.createEvent;
        //     return update(prev, {
        //       organisation: {
        //         events: {
        //           $unshift: [newEvent],
        //         },
        //       },
        //     });
        //   },
        // },
      })
    }
  }),
});
