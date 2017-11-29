// import Head from 'next/head'

import React from 'react'
// import cookie from 'cookie'
import { withApollo, compose } from 'react-apollo'
import Link from 'next/link';
import { Button } from 'semantic-ui-react'

import withData from 'lib/withData'
import getUser from 'lib/getUser'

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
      <Layout>
        <AppTitle header="Mobilisez et gérez votre communauté">
          Gérez facilement tous vos bénévoles et vos engagements:
          <br />
          inscrivez-vous aux activités, partagez des informations, mobilisez vos camarades
        </AppTitle>
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <Link href="/community-create" as={`/communities/create`} prefetch>
            <Button size="big" primary>Créer ma communauté</Button>
          </Link>
          <Link href={`/communities`} prefetch>
            <Button size="big">Rejoindre une communauté</Button>
          </Link>
        </div>
        <Landing />
      </Layout>
    )
  }
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(Index)
