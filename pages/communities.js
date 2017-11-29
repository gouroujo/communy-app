import withData from 'lib/withData'
import CommunityList from 'containers/Community/List';

import Layout from 'components/web/misc/Layout'
import AppTitle from 'components/web/misc/Title'

export default withData(() => (
  <Layout>
    <AppTitle header="Trouvez un engagement qui vous ressemble">
      Choisissez votre cause, gérez votre engagement au quotidien en fonction de vos disponibilités
    </AppTitle>
    <CommunityList />
  </Layout>
))
