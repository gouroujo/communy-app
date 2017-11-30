// import Head from 'next/head'

import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link';
import { Button, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

import ResetForm from 'containers/User/ResetForm'

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
      <Layout title="Communy - Mot de passe perdu">
        <AppTitle header="Mot de passe perdu">
          Entrez votre adresse email pour définir un nouveau mot de passe
          <br /><br />
          <Link href="/signin">
            <Button basic inverted>
              Pas encore de compte ? S'inscrire
            </Button>
          </Link>
        </AppTitle>
        <Segment style={{ maxWidth: 500, textAlign: 'center', margin: '0 auto' }}>
          <ResetForm />

          <div style={{ textAlign: 'center'}}>
            <Link href="/login">
              <a style={{ color: 'black' }}>Se connecter</a>
            </Link>
          </div>
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
