import gql from 'graphql-tag'

export default gql`
  fragment CommunityMinFragment on Organisation {
    id
    title
    logo
  }
`;
