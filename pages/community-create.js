import withData from 'lib/withData'
import Link from 'next/link'
import { Container, Segment, Button } from 'semantic-ui-react'

import Menu from 'containers/misc/Menu'
import AppTitle from 'components/web/misc/Title'
import Layout from 'components/web/misc/Layout'

import CommunityCreate from 'containers/Community/Create'

export default withData(() => (
  <Layout
    colors={["#17ab61", "#1760aa"]}
    menu={<Menu logo="/static/images/logo_white.png"/>}
    header={(
      <div>
        <AppTitle header="Gérez votre communauté au quotidien" >
          Améliorez la visibilité de votre communauté, inviter vos membres existants à vous rejoindre,
          <br />
          plannifiez vos activités, mobilisez vos troupes !
          <br /><br />
          <Link href="/communities">
            <Button basic inverted>
              Vous souhaitez plutôt rejoindre une communauté existante ?
            </Button>
          </Link>
        </AppTitle>
      </div>
    )}>

    <Container>
      <Segment>
        <CommunityCreate />
      </Segment>
    </Container>
  </Layout>
))
