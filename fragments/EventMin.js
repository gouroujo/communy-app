import gql from 'graphql-tag'

export default gql`
  fragment EventMinFragment on Event {
    id
    title
    startTime
    endTime
    open
  }
`;
