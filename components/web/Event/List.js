import { List } from 'semantic-ui-react'
import Link from 'next/link'
import DayRange from './DayRange'
import Answer from './Answer'

export default ({ events=[], nevents, action, communityId }) => (
  <div>
    {(nevents > events.length) && (
      <div>Voir Plus</div>
    )}
    <List divided selection verticalAlign='middle' style={{ textAlign: 'initial'}}>
      {events.map(event => (
        <Link
          key={event.id}
          href={`/community-event?communityId=${communityId || (event.community && event.community.id)}&eventId=${event.id}`}
          as={`/communities/${communityId || (event.community && event.community.id)}/events/${event.id}`}>
          <List.Item>
            {action ? (
              <List.Content floated='right'>
                <action eventId={event.id} answer={event.participation && event.participation.answer}/>
              </List.Content>
            ) : (
              <List.Content floated='right'>
                <Answer answer={event.participation && event.participation.answer}/>
              </List.Content>
            )}
            <List.Content>
              <List.Header>{event.title}</List.Header>
              <List.Description>
                <DayRange start={event.startTime} end={event.endTime} />
              </List.Description>

            </List.Content>
          </List.Item>
        </Link>

      ))}
    </List>
  </div>

)
