import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import CommunityHome from 'containers/Community/Home'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <CommunityHome communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
