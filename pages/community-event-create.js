import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import EventCreate from 'containers/Event/Create'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <EventCreate communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
