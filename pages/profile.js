import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link'
import redirect from 'lib/redirect'
import { Button, Container, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import Layout from 'components/web/misc/Layout'

import Menu from 'containers/misc/Menu'
import AppTitle from 'containers/misc/AppTitle'
import UserForm from 'containers/User/Form'

class Index extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const { user } = await getUser(context, apolloClient)
    if (!user) {
      redirect(context, '/')
    }
    return { user }
  }

  render () {
    return (
      <Layout
        colors={["#17ab61", "#1760aa"]}
        header={(
          <div>
            <Menu logo="/static/images/logo_white.png"/>
            <AppTitle header="Mon profil" />
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <Link href={`/`} prefetch>
                <Button inverted basic>Retour</Button>
              </Link>
            </div>

          </div>
        )}>
        <Container>
          <Segment>
            <UserForm />
          </Segment>
        </Container>
      </Layout>
    )
  }
};

export default compose(
  withData,
  withApollo
)(Index)
