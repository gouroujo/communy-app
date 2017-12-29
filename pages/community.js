import React from 'react'
import { withApollo, compose } from 'react-apollo'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import CommunityContainer from 'containers/Community/Container'
import CommunityHome from 'containers/Community/Home'

import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'containers/misc/AppTitle'

class CommunityPage extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const user = await getUser(context, apolloClient)
    return { user }
  }

  render () {
    const { communityId } = this.props
    return (
      <Layout
        colors={["#17ab61", "#1760aa"]}
        menu={<Menu logo="/static/images/logo_white.png"/>}
        header={(
            <AppTitle header="Bienvenue sur votre future communauté" />
        )}>
        <CommunityContainer communityId={communityId}>
          <CommunityHome communityId={communityId} />
        </CommunityContainer>
      </Layout>
    )
  }
};

export default compose(
  withData,
  withApollo
)(CommunityPage)
