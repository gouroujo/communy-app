// import Head from 'next/head'

import React from 'react'
// import cookie from 'cookie'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link';
import { Button } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'containers/misc/AppTitle'
import Landing from 'containers/misc/Landing'

class Index extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const user = await getUser(context, apolloClient)
    // if (user) {
    //   // If not signed in, send them somewhere more useful
    //   // redirect(context, '/app')
    // }

    return { user }
  }
  render () {
    // console.log(this.props)
    // if (this.props.user) {
    //   return (
    //     <Layout>
    //       HELLO
    //     </Layout>
    //   )
    // }

    return (
      <Layout
        colors={["#3D7EAA","#cfae2e"]}
        menu={<Menu logo="/static/images/logo_corporate_white.png"/>}
        header={(
          <div>
            <AppTitle header="Engagez vos équipes dans des associations">
              Sélectionnez des associations locales en lien avec votre activité
              <br />
              Développez votre Responsabilité Sociale d'Entreprise et le bien-être de vos collaborateurs
              <br />
              Mesurez l'implication de vos équipes et communiquez dessus
              <br/>
              <h3 style={{ fontWeight: 'light' }}>À partir de 10€/mois</h3>
            </AppTitle>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <Link href="/company-create" as={`/join`} prefetch>
                <Button size="big" primary>Inscrire mon entreprise</Button>
              </Link>
              <Link href={`/login`} prefetch>
                <Button size="big">Se connecter</Button>
              </Link>
            </div>
          </div>
        )}>

        <Landing />
      </Layout>
    )
  }
};

export default compose(
  withData,
  withApollo
)(Index)
