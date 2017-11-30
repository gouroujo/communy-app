import DayRange from 'components/web/Event/DayRange'
import { Menu } from 'semantic-ui-react'
import Link from 'components/web/misc/ActiveLink'

export default ({ event = {}, children, eventId, communityId }) => (
  <div className="header">
    <div className="content">
      <h3>{event.title}</h3>
      <span>
        <DayRange start={event.startTime} end={event.endTime} />
      </span>
      {children}
    </div>
    <div className="menu">
      <Menu pointing secondary style={{ justifyContent: 'center'}}>
        <Link
          exact
          href={`/community-event?communityId=${communityId}&eventId=${eventId}`}
          as={`/communities/${communityId}/events/${eventId}`}>
          <Menu.Item name='Informations'/>
        </Link>
        <Link
          href={`/community-event-participants?communityId=${communityId}&eventId=${eventId}`}
          as={`/communities/${communityId}/events/${eventId}/participants`}>
          <Menu.Item name='Réponses'/>
        </Link>
      </Menu>
    </div>
    <style jsx>{`
      .header {
        position: relative;
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: center;
        border: 1px solid #bebebe;
        border-radius: .28571429rem .28571429rem;
      }
      .content {
        margin: 10px;
        padding-bottom: 50px;
        text-align: center;
      }
      .menu {
        position: absolute;
        bottom: -1px;
        right: 0;
        left: 0;
      }
    `}</style>
  </div>
)
