import gql from 'graphql-tag'

export default gql`
  fragment ParticipationFragment on Participation {
    id
    answer
  }
`;
