import React from 'react'
import gql from 'graphql-tag';
import { Image, Item } from 'semantic-ui-react'

import withEvents from 'hocs/queries/withEvents'
import EventMinFragment from 'fragments/EventMin'

// import EventListComponent from 'components/web/Event/List'



export const query = gql`
  query CommunityEventList(
    $limit: Int
    $offset: Int
    $before: DateTime
    $after: DateTime
    $communityId: ID
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
      }
    }
  }
  ${EventMinFragment}
`

class EventList extends React.PureComponent {
  render() {
    const { community } = this.props;
    if (!community) return null
    return (
      <Item.Group>
        <Item>
          <Item.Image size='tiny'>
            A
          </Item.Image>

          <Item.Content>
            <Item.Header as='a'>Header</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              <Image src='/assets/images/wireframe/short-paragraph.png' />
            </Item.Description>
            <Item.Extra>Additional Details</Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />

          <Item.Content>
            <Item.Header as='a'>Header</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              <Image src='/assets/images/wireframe/short-paragraph.png' />
            </Item.Description>
            <Item.Extra>Additional Details</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}

export default withEvents(query)(EventList)
