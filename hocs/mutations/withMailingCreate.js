import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import MailingFragment from 'fragments/Mailing'

export const mutation = gql`
  mutation createEvent(
    $input: MailingCreateInput!
    $communityId: ID!
  ) {
    mailing: createAndSendMailing (
      organisationId: $communityId
      input: $input
    ) {
      ...MailingFragment
    }
  }
  ${MailingFragment}
`;

export default graphql(mutation, {
  props: ({ mutate, ownProps }) => ({
    createAndSendMailing: (mailing) => {
      return mutate({
        variables: {
          communityId: ownProps.communityId,
          input: mailing,
        },
      })
    }
  }),
});
