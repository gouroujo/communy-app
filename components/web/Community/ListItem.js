import { Card, Image } from 'semantic-ui-react'
import Link from 'next/link'

import CommunityType from 'components/web/Community/Type'

export default ({ community = {}, action }) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
      <Card.Header>
        <Link
          href={`/community?communityId=${community.id}`}
          as={`/communities/${community.id}`}
        >
          {community.title}
        </Link>
      </Card.Header>
      <Card.Meta>
        <CommunityType type={community.type} />
      </Card.Meta>
      <Card.Description>
        {community.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra style={{ textAlign: 'center' }}>
      {action}
    </Card.Content>
  </Card>
)
