import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link'

import { Button, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import redirect from 'lib/redirect'
import getUser from 'lib/getUser'

import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

import SigninForm from 'containers/User/SigninForm'

class Login extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { user } = await getUser(context, apolloClient)
    if (user) {
      redirect(context, '/')
    }

    return { user }
  }


  render () {

    return (
      <Layout
        title="Communy - Inscription"
        colors={["#17ab61", "#1760aa"]}
        menu={<Menu logo="/static/images/logo_white.png"/>}
        header={(
          <AppTitle header="Inscription">
            Créez-vous un compte personnel pour créer ou rejoindre une communauté
            <br /><br />

            <Link href="/login">
              <Button basic inverted>
                Déja un compte ? Se connecter
              </Button>
            </Link>

          </AppTitle>
        )}>
        <Segment style={{ maxWidth: 500, textAlign: 'center', margin: '0 auto' }}>
          <SigninForm />
        </Segment>
      </Layout>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Login)
