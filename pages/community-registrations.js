import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import CommunityRegistrations from 'containers/Community/RegistrationList'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <CommunityRegistrations communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
