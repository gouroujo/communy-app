import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import CommunityRegistrations from 'containers/Community/RegistrationList'

import Menu from 'containers/misc/Menu'
import Layout from 'components/web/misc/Layout'
import AppTitle from 'containers/misc/AppTitle'

export default withData((props) => (
  <Layout
    colors={["#17ab61", "#1760aa"]}
    menu={<Menu logo="/static/images/logo_white.png"/>}
    header={(
        <AppTitle header="Bienvenue sur votre future communauté" />
    )}>
    <CommunityContainer communityId={props.communityId}>
      <CommunityRegistrations communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
