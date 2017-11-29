import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'

import EventContainer from 'containers/Event/Container'
import EventView from 'containers/Event/View'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <EventContainer
        communityId={props.communityId}
        eventId={props.eventId}>
        <EventView
          communityId={props.communityId}
          eventId={props.eventId}
        />
      </EventContainer>
    </CommunityContainer>
  </Layout>
))
