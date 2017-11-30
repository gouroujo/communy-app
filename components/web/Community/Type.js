import { Icon } from 'semantic-ui-react'

export default ({ type }) => {

  if (type === 'public') {
    return <span style={{color: '#9e9e9e'}}><Icon name="world" />Communauté publique</span>
  } else if (type === 'private') {
    return <span style={{color: '#9e9e9e'}}><Icon name="privacy" />Communauté privée</span>
  } else if (type === 'secret') {
    return <span style={{color: '#9e9e9e'}}><Icon name="hide" />Communauté secrète</span>
  }
  return null;
}
