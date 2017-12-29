import React from 'react'
import { withApollo, compose } from 'react-apollo'
// import Link from 'next/link'
import redirect from 'lib/redirect'
// import { Button, Container, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import AppLayout from 'components/web/misc/AppLayout'

import UserContainer from 'containers/User/Container'
import UserInbox from 'containers/User/Inbox'
import AppMenu from 'containers/misc/AppMenu'

// import AppTitle from 'containers/misc/AppTitle'
// import UserForm from 'containers/User/Form'

class Inbox extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const user = await getUser(context, apolloClient)
    if (!user) {
      redirect(context, '/')
    }
    return { user }
  }

  render () {
    const { user } = this.props
    return (
      <AppLayout
        title="Communy - Boite de réception"
        menu={(<AppMenu user={user} logo="/static/images/logo_white.png"/>)}>
        <UserContainer>
          <UserInbox />
        </UserContainer>
      </AppLayout>
    )
  }
};

export default compose(
  withData,
  withApollo
)(Inbox)
