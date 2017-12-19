import withData from 'lib/withData'
import Link from 'next/link'
import { Container, Button } from 'semantic-ui-react'

import CommunityList from 'containers/Community/List';
import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

export default withData(() => (
  <Layout
    colors={["#17ab61", "#1760aa"]}
    menu={<Menu logo="/static/images/logo_white.png"/>}
    header={(
      <div>
        <AppTitle header="Trouvez un engagement qui vous ressemble">
          Choisissez votre cause, gérez votre engagement au quotidien en fonction de vos disponibilités
          <br /><br />
          <Link href="/community-create" as="/communities/create">
            <Button basic inverted>
              Vous souhaitez plutôt créer votre communauté ?
            </Button>
          </Link>
        </AppTitle>
      </div>
    )}>
    <Container>
      <CommunityList />
    </Container>
  </Layout>
))
