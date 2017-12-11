import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// import { fragment as EventContainerFragment } from 

export default graphql(gql`
  mutation eventAnswer(
    $id: ID!,
    $input: addUserToEventInput!,
    $userId: ID
  ) {
    event: addUserToEvent(
      id: $id
      input: $input
    ) {
      id
      nyes
      nanswer
      nno
      nmb
      participation (userId: $userId) {
        id
        answer
      }
    }
  }
`, {
  props: ({ mutate, ownProps }) => ({
    eventAnswer: (answer) => mutate({
      variables: {
        id: ownProps.eventId,
        userId: ownProps.userId,
        input: {
          answer,
          userId: ownProps.userId
        },
      },
      optimisticResponse: ownProps.event && {
        __typename: 'Mutation',
        event: {
          __typename: 'Event',
          ...ownProps.event,
          participation: {
            __typename: 'Participation',
            id: -1,
            ...ownProps.event.participation,
            answer: answer,
          },
        }
      },
      // update: (store, { data: { event } }) => {
      //   const data = store.readQuery()
      // },
    }),
  })
});
