import React from 'react'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link';
import { Button, Segment } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'
import redirect from 'lib/redirect'

import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

import LoginForm from 'containers/User/LoginForm'

class Login extends React.Component {

  static async getInitialProps (context, apolloClient) {
    const { user } = await getUser(context, apolloClient)
    if (user) {
      redirect(context, '/')
    }

    return { user, ...context.query }
  }

  render () {
    return (
      <Layout
        title="Communy - Connexion"
        colors={["#17ab61", "#1760aa"]}
        menu={<Menu logo="/static/images/logo_white.png"/>}
        header={(
          <AppTitle header="Connexion">
            Connectez-vous pour accéder à votre espace personnel
            <br /><br />
            <Link href={{ pathname: '/signin', query: { target: this.props.target, as: this.props.as } }}>
              <Button basic inverted>
                Pas encore de compte ? S'inscrire
              </Button>
            </Link>
          </AppTitle>
        )}>

        <Segment style={{ maxWidth: 500, textAlign: 'center', margin: '0 auto' }}>
          <LoginForm target={this.props.target} as={this.props.as}/>
          <div style={{ textAlign: 'center'}}>
            <Link href={{ pathname: '/reset', query: { target: this.props.target, as: this.props.as } }}>
              <a style={{ color: 'black' }}>Mot de passe perdu ?</a>
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
