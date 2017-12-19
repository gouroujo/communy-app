import { Menu, Icon } from 'semantic-ui-react'
import Link from 'components/web/misc/ActiveLink'

export default ({ communityId, permissions = [] }) => {
  const items = []

  if (permissions && permissions.includes('event_list')) {
    items.push(
      <Link
        key='event_list'
        href={`/community-events?communityId=${communityId}`}
        as={`/communities/${communityId}/events`}
        >
        <Menu.Item>
          Activités
        </Menu.Item>
      </Link>
    )
  }

  if (permissions && permissions.includes('user_list')) {
    items.push(
      <Link
        key='user_list'
        href={`/community-registrations?communityId=${communityId}`}
        as={`/communities/${communityId}/users`}
        >
        <Menu.Item>
          Membres
        </Menu.Item>
      </Link>
    )
  }

  if (permissions && permissions.includes('mailings')) {
    items.push(
      <Link
        key='mailings'
        href={`/community-mailings?communityId=${communityId}`}
        as={`/communities/${communityId}/mailings`}
        >
        <Menu.Item>
          Messagerie
        </Menu.Item>
      </Link>
    )
  }

  if (permissions && permissions.includes('edit')) {
    items.push(
      <Link
        key='edit'
        href={`/community-edit?communityId=${communityId}`}
        as={`/communities/${communityId}/edit`}
        >
        <Menu.Item position="right" className="mobile hidden">
           <Icon name='edit' />
        </Menu.Item>
      </Link>
    )
  }

  if (items.length === 0) return null;
  return (
    <Menu>
      <Link
        exact
        href={`/community?communityId=${communityId}`}
        as={`/communities/${communityId}`}
        >
        <Menu.Item>
          À propos
        </Menu.Item>
      </Link>
      {items}
    </Menu>
  )
}
