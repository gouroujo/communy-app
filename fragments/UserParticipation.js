import gql from 'graphql-tag'
import ParticipationFragment from 'fragments/Participation'

export default gql`
  fragment UserParticipationFragment on User {
    id
    participation (eventId: $eventId) {
      ...ParticipationFragment
    }
  }
  ${ParticipationFragment}
`;
