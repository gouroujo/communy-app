import withData from 'lib/withData'
import CommunityContainer from 'containers/Community/Container'

import EventContainer from 'containers/Event/Container'
import EventParticipationList from 'containers/Event/ParticipationList'

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
