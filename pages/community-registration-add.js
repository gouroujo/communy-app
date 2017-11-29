import withData from 'lib/withData'

import CommunityContainer from 'containers/Community/Container'
import AddRegistration from 'containers/Registration/Add'
import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <AddRegistration
        communityId={props.communityId}
      />
    </CommunityContainer>
  </Layout>
))
