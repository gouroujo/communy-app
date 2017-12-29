import React from 'react'
import { withApollo, compose } from 'react-apollo'
// import Link from 'next/link'
import redirect from 'lib/redirect'
// import { Button, Container, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import CommunityContainer from 'containers/Community/Container'

import CommunityMailingContainer from 'containers/Community/MailingContainer'
import MailingForm from 'containers/Mailing/Form'
import MailingView from 'containers/Mailing/View'

import Menu from 'containers/misc/AppMenu'
import Layout from 'components/web/misc/AppLayout'

class Inbox extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const user = await getUser(context, apolloClient)
    if (!user) {
      redirect(context, '/')
    }
    return { user }
  }

  render () {
    const { communityId, mailingId } = this.props
    return (
      <Layout
        colors={["#17ab61", "#1760aa"]}
        menu={<Menu logo="/static/images/logo_white.png"/>}>
        <CommunityContainer communityId={communityId}>
          <CommunityMailingContainer communityId={communityId}>
          {mailingId === 'new' ? (
            <MailingForm communityId={communityId} />
          ): (
            <MailingView mailingId={mailingId} />
          )}
          </CommunityMailingContainer>
        </CommunityContainer>
      </Layout>
    )
  }
};

export default compose(
  withData,
  withApollo
)(Inbox)
