import getRoleOption from 'components/web/Registration/getRoleOption'
import { Dropdown, Button, Icon } from 'semantic-ui-react'

export default ({style, registration, permissions=[], setRole}) => {
  if (!permissions || !registration) return null
  const roles = []
  const currentRole = getRoleOption(registration.role)

  if (permissions.includes('set_mb_role')) {
    const member = getRoleOption('MEMBER')
    roles.push(
      <Dropdown.Item
        key="member"
        onClick={(ev) => setRole(ev, 'MEMBER')}
        icon={{ color: member.color, name: member.icon}}
        text={member.label} />
    )
  }
  if (permissions.includes('set_mod_role')) {
    const moderator = getRoleOption('MODERATOR')
    roles.push(
      <Dropdown.Item
        key="moderator"
        onClick={(ev) => setRole(ev, 'MODERATOR')}
        icon={{ color: moderator.color, name: moderator.icon}}
        text={moderator.label} />
    )
  }
  if (permissions.includes('set_ad_role')) {
    const admin = getRoleOption('ADMIN')
    roles.push(
      <Dropdown.Item
        key="admin"
        onClick={(ev) => setRole(ev, 'ADMIN')}
        icon={{ color: admin.color, name: admin.icon}}
        text={admin.label} />
    )
  }
  if (roles.length === 0) {
    return (
      <Button disabled>
        {currentRole ? (
          <span>
            <Icon name={currentRole.icon} color={currentRole.color}/>{currentRole.label}
          </span>
        ) : (
          <span>
            <Icon name={currentRole.icon} color={currentRole.color}/>Aucun role
          </span>
        )}
      </Button>
    )
  }

  return (
    <Dropdown
      style={style}
      text={currentRole.label}
      icon={currentRole.icon}
      floating labeled button className='icon'>
      <Dropdown.Menu>
        <Dropdown.Header content='Séléctionnez le role' />
        <Dropdown.Divider />
        {roles}
      </Dropdown.Menu>
    </Dropdown>
  )

}
