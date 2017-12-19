import gql from 'graphql-tag'
import EventMinFragment from 'fragments/EventMin'

export default gql`
  fragment EventFragment on Event {
    ...EventMinFragment
    duration
    description
    nanswer
    nyes
    nno
    nmb
  }
  ${EventMinFragment}
`;
