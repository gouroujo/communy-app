import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import dataIdFromObject from 'lib/dataIdFromObject'

import ParticipationFragment from 'fragments/Participation'
import EventParticipationFragment from 'fragments/EventParticipation'
import UserParticipationFragment from 'fragments/UserParticipation'

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
        ...ParticipationFragment
      }
    }
  }
  ${ParticipationFragment}
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
            // ...ownProps.event.participation,
            answer: answer,
          },
        }
      },
      update: (store, { data }) => {
        if (!data.event || !data.event.participation) return

        const event = store.readFragment({
          id: dataIdFromObject({ id: ownProps.eventId, __typename: 'Event' }),
          fragmentName: 'EventParticipationFragment',
          fragment: EventParticipationFragment,
          variables: { userId: ownProps.userId }
        })

        if (event) {
          event.participation = data.event.participation
          store.writeFragment({
            id: dataIdFromObject({ id: ownProps.eventId, __typename: 'Event' }),
            fragmentName: 'EventParticipationFragment',
            fragment: EventParticipationFragment,
            variables: { userId: ownProps.userId },
            data: event,
          })
        }

        const user = store.readFragment({
          id: dataIdFromObject({ id: ownProps.userId, __typename: 'User' }),
          fragmentName: 'UserParticipationFragment',
          fragment: UserParticipationFragment,
          variables: { eventId: ownProps.eventId }
        })

        if (user && !user.participation) {
          user.participation = data.event.participation
          store.writeFragment({
            id: dataIdFromObject({ id: ownProps.userId, __typename: 'User' }),
            fragmentName: 'UserParticipationFragment',
            fragment: UserParticipationFragment,
            variables: { eventId: ownProps.eventId },
            data: user
          })
        }


      },
    }),
  })
});
