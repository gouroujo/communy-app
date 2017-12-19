import gql from 'graphql-tag'
import ParticipationFragment from 'fragments/Participation'

export default gql`
  fragment EventParticipationsFragment on Event {
    id
    participations {
      ...ParticipationFragment
    }
  }
  ${ParticipationFragment}
`;
