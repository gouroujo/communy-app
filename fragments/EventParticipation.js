import gql from 'graphql-tag'
import ParticipationFragment from 'fragments/Participation'

export default gql`
  fragment EventParticipationFragment on Event {
    id
    participation (userId: $userId) {
      ...ParticipationFragment
    }
  }
  ${ParticipationFragment}
`;
