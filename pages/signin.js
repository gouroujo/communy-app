import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link'

import { Button, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

import SigninForm from 'containers/User/SigninForm'

class Login extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const user = await getUser(context, apolloClient)
    if (user) {
      // redirect(context, '/app')
    }

    return { user }
  }

  // signout = () => {
  //   document.cookie = cookie.serialize('token', '', {
  //     maxAge: -1 // Expire the cookie immediately
  //   })
  //
  //   // Force a reload of all the current queries now that the user is
  //   // logged in, so we don't accidentally leave any state around.
  //   this.props.client.resetStore().then(() => {
  //     // Redirect to a more useful page when signed out
  //     redirect({}, '/signin')
  //   })
  // }

  render () {

    return (
      <Layout title="Communy - Inscription">
        <AppTitle header="Inscription">
          Créez-vous un compte personnel pour créer ou rejoindre une communauté
          <br /><br />

          <Link href="/login">
            <Button basic inverted>
              Déja un compte ? Se connecter
            </Button>
          </Link>

        </AppTitle>
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
