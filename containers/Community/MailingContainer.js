import React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { withRouter } from 'next/router'

import { Button } from 'semantic-ui-react'

import MailingList from 'components/web/Mailing/List'

import MailingFragment from 'fragments/Mailing'
import withCommunity from 'hocs/queries/withCommunity'

export const query = gql`
  query CommunityView(
    $communityId: ID!
  ) {
    community: organisation (id: $communityId ) {
      id
      mailings {
        ...MailingFragment
      }
    }
  }
  ${MailingFragment}
`

class CommunityMailingContainer extends React.PureComponent {

  handleClick = (mailingId) => {
    this.props.router.push(
      `/community-mailings?communityId=${this.props.communityId}&mailingId=${mailingId}`,
      `/communities/${this.props.communityId}/mailings/${mailingId}`
    )
  }

  render() {
    const { communityId, community, children } = this.props

    if (!community) return null
    return (
      <div className="view">
        <div>
          <Link
            href={`/community-mailings?communityId=${communityId}&mailingId=new`}
            as={`/communities/${communityId}/mailings/new`}>
            <Button primary content="Nouveau message" icon='write' labelPosition='left' />
          </Link>
        </div>
        <div className="container">
          <div className="menu">
            <MailingList mailings={community.mailings} onClick={this.handleClick} />
          </div>
          <div className="content">
            {children}
          </div>
        </div>
        <style jsx>{`
          .view {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .container {
            display: flex;
            flex: 1;
            align-items: stretch;

          }
          .menu {
            flex: 1 1 auto;
            max-width: 300px;
            min-width: 150px;
          }
          .content {
            flex: 3;
            border-left: 1px solid #b8b8b8;
            padding-left: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default withCommunity(query)(withRouter(CommunityMailingContainer))
