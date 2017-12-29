import gql from 'graphql-tag'

export default gql`
  fragment CommunityFragment on Organisation {
    id
    title
    logo
    cover
    nusers
    nevents
    description
  }
`;
