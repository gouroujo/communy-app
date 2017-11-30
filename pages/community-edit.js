import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'
import CommunityEdit from 'containers/Community/Edit'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <CommunityEdit communityId={props.communityId} />
    </CommunityContainer>
  </Layout>
))
