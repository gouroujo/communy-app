import gql from 'graphql-tag'

export default gql`
  fragment MailingFragment on Mailing {
    id
    subject
    body
    nreceipients
    nread
  }
`;
