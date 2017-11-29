import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


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
      //   const data = store.readFragment({
      //     id: dataIdFromObject({id: ownProps.userId, __typename: 'User'}),
      //     fragment: UserParticipationFragment,
      //     fragmentName: 'UserParticipationFragment',
      //     variables: { eventId: ownProps.eventId}
      //   })
      //   store.writeFragment({
      //     id: dataIdFromObject({id: ownProps.userId, __typename: 'User'}),
      //     fragment: UserParticipationFragment,
      //     fragmentName: 'UserParticipationFragment',
      //     variables: { eventId: ownProps.eventId},
      //     data: {
      //       ...data,
      //       participation: event.participation
      //     }
      //   });
      // },
    }),
  })
});
