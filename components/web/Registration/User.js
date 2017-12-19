import { Card, Image, Icon } from 'semantic-ui-react'

export default ({ user }) => (
  <Card fluid style={{ textAlign: 'initial'}}>
    {user && user.avatar && <Image centered src={user.avatar} size="medium" />}
    <Card.Content>
      <Card.Header>
        {user && user.fullname}
      </Card.Header>
    </Card.Content>
    {user && user.phone1 && (
      <Card.Content extra>
        <Icon name='phone' />
        {user.phone1}
      </Card.Content>
    )}
    {user && user.phone2 && (
      <Card.Content extra>
        <Icon name='phone' />
        {user.phone2}
      </Card.Content>
    )}
    {user && user.email && (
      <Card.Content extra>
        <a href={`mailto:${user.email}`}>
          <Icon name='mail' />
          {user.email}
        </a>
      </Card.Content>
    )}
    {user && user.address && (
      <Card.Content extra>
        <Icon name='marker' />
        {user.address}
      </Card.Content>
    )}

  </Card>
)
