import withData from 'lib/withData'
import Link from 'next/link'
import { Container, Button } from 'semantic-ui-react'

import Menu from 'containers/misc/Menu'
import AppTitle from 'components/web/misc/Title'
import Layout from 'components/web/misc/Layout'

import CompanyCreate from 'containers/Company/Create'

export default withData(() => (
  <Layout
    colors={["#3D7EAA","#cfae2e"]}
    menu={<Menu logo="/static/images/logo_corporate_white.png"/>}
    header={(
      <AppTitle header="Votre entreprise. Responsable." >
        <Link href="/index-corporate" as="/">
          <Button basic inverted>
            Retour
          </Button>
        </Link>
      </AppTitle>
    )}>
    <Container>
        <CompanyCreate />
    </Container>
  </Layout>
))
