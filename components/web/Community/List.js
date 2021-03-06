import { Card, Image } from 'semantic-ui-react'
import Link from 'next/link'
import CommunityType from 'components/web/Community/Type'

export default ({ communities = [], Action }) => (
  <Card.Group textAlign='center'>
    {communities.map(community => (
      <Card key={community.id} style={{ textAlign: 'initial'}}>
        <Image src={community.cover} />
        <Card.Content>
          <Image floated='right' size='mini' src={community.logo} />
          <Card.Header>
            <Link
              href={`/community?communityId=${community.id}`}
              as={`/communities/${community.id}`}
            >
              <a>{community.title}</a>
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
          <Action communityId={community.id} community={community} />
        </Card.Content>
      </Card>
    ))}
  </Card.Group>
)
