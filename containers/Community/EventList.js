import React from 'react'
import gql from 'graphql-tag';
import { Item, Image } from 'semantic-ui-react'

import DayRange from 'components/web/Event/DayRange'

import withCommunity from 'hocs/queries/withCommunity'
import EventMinFragment from 'fragments/EventMin'
import ParticipationFragment from 'fragments/Participation'

export const query = gql`
  query CommunityEventList(
    $limit: Int
    $offset: Int
    $before: DateTime
    $after: DateTime
    $communityId: ID!
  ) {
    community: organisation (id: $communityId) {
      id
      events (
        limit: $limit
        offset: $offset
        before: $before
        after: $after
      ) {
        ...EventMinFragment
        description
        participation {
          ...ParticipationFragment
        }
      }
    }
  }
  ${EventMinFragment}
  ${ParticipationFragment}
`

class CommunityEventList extends React.PureComponent {
  render() {
    const { community, onClick } = this.props;
    if (!community) return null

    if (!community.events || community.events.length === 0) {
      return (
        <div>
          Vide
        </div>
      )
    }
    return (
      <Item.Group divided>
        {community.events.map(event => (
          <Item key={event.id} className="event-item" onClick={() => onClick(event.id)}>
            {/* <Item.Image size='tiny'>
              A b d sdz
            </Item.Image> */}

            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Meta>
                <DayRange start={event.startTime} end={event.endTime} />
              </Item.Meta>
              <Item.Description>
                {event.description}
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
        <style jsx global>{`
          .event-item {
            padding: 0 !important;
            font-size: 0.8em !important;
            line-height: 0.8em !important;
            height: 7em;
            overflow: hidden;
            position:relative;
          }
          .event-item:after {
            height: 2em !important;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            visibility: visible!important;
            background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,1) 100%);
          }
          .event-item > .content {
            margin: 0 5px !important;
            padding-top: 1em !important;
          }
        `}</style>
      </Item.Group>
    )
  }
}

export default withCommunity(query)(CommunityEventList)
