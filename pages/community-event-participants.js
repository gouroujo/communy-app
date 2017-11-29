import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'

import EventContainer from 'containers/Event/Container'
import EventParticipationList from 'containers/Event/ParticipationList'

import Layout from 'components/web/misc/Layout'

export default withData((props) => (
  <Layout>
    <CommunityContainer communityId={props.communityId}>
      <EventContainer
        communityId={props.communityId}
        eventId={props.eventId}>
        <EventParticipationList
          communityId={props.communityId}
          eventId={props.eventId}
        />
      </EventContainer>
    </CommunityContainer>
  </Layout>
))
