import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import CommunityEvents from 'containers/Community/EventList'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <CommunityEvents communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
