import withData from 'lib/withData'

import CommunityContainer from 'containers/Community/Container'
import CommunityRegistration from 'containers/Community/Registration'
import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <CommunityRegistration
        communityId={props.communityId}
        userId={props.userId}
      />
    </CommunityContainer>
  </Layout>
))
