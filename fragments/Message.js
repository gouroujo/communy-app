import gql from 'graphql-tag'

export default gql`
  fragment MessageFragment on Message {
    id
    subject
    body
    nanswers
    readAt
  }
`;
