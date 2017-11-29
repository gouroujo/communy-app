// import Head from 'next/head'

import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link';
import { Button } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

import LoginForm from 'containers/User/LoginForm'

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
      <Layout title="Communy - Connexion">
        <AppTitle header="Connexion">
          Connectez-vous pour accéder à votre espace personnel
          <br /><br />
          <Link href="/signin">
            <Button basic inverted>
              Pas encore de compte ? S'inscrire
            </Button>
          </Link>
        </AppTitle>
        <LoginForm />

        <div style={{ textAlign: 'center'}}>
          <Link href="/reset">
            <a style={{ color: 'black' }}>Mot de passe perdu ?</a>
          </Link>
        </div>

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
