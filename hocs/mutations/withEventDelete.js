import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { query as CurrentUserQuery } from 'hocs/queries/withUser';
import { query as OrganisationEventsQuery } from 'hocs/queries/withOrganisationEvents';

import EventFragment from 'fragments/Event';

export const mutation = gql`
  mutation deleteEvent (
    $eventId: ID!
  ) {
    deleteEvent (
      id: $eventId
    ) {
      ...EventFragment
    }
  }
  ${EventFragment}
`;

export default graphql(mutation,
  {
    props: ({ mutate, ownProps }) => ({
      deleteEvent: () => mutate({
        variables: {
          eventId: ownProps.eventId,
        },
        refetchQueries: [
          { query: CurrentUserQuery },
          { query: OrganisationEventsQuery, variables: { organisationId: ownProps.organisationId } },
        ],
      }),
    }),
  }
);
