import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import pick from 'lodash.pick'

const ORG_CATEGORIES = [
  { id: 'ngo', icon: 'heart', label: 'Caritatif' },
  { id: 'art', icon: 'paint brush', label: 'Art' },
  { id: 'music', icon: 'music', label: 'Musique' },
  { id: 'science', icon: 'lab', label: 'Science' },
  { id: 'it', icon: 'at', label: 'Informatique' },
  { id: 'politic', icon: 'university', label: 'Politique' },
  { id: 'consumer', icon: 'shopping basket', label: 'Consommation' },
  { id: 'ecology', icon: 'leaf', label: 'Écologie' },
  { id: 'sport', icon: 'soccer', label: 'Sport' },
  { id: 'handi', icon: 'wheelchair', label: 'Handicap' },
  { id: 'student', icon: 'student', label: 'Éducation' },
  { id: 'party', icon: 'birthday', label: 'Fête' },
  { id: 'migration', icon: 'exchange', label: 'Migrations' },
]

export default class SelectTag extends React.Component {
  handleSelectTag = (ev, { name }) => {
    ev.preventDefault();
    if (!this.props.onChange) return
    if (!this.props.tags) this.onChange([name])

    const v = [...this.props.tags]
    if (v.includes(name)) {
      v.splice(v.findIndex(e => e === name), 1);
    } else {
      v.push(name)
    }
    this.props.onChange(v)
  }

  render () {
    const { tags, onChange, ...props } = this.props
    return ORG_CATEGORIES.map(({id, icon, label}) => (
      <Button
        type="button"
        key={id}
        name={id}
        onClick={this.handleSelectTag}
        style={{ margin: 5 }}
        animated='fade'
        primary={tags.includes(id)}
        size='big'
        {...pick(props, ['style', 'basic', 'size', 'color', 'inverted'])}>
        <Button.Content hidden>
          <span style={{ fontSize: '1rem'}}>{label}</span>
        </Button.Content>
        <Button.Content visible>
          <Icon name={icon} />
        </Button.Content>
      </Button>
    ))
  }
}
