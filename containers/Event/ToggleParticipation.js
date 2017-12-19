import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import withEventEdit from 'hocs/mutations/withEventEdit';

class ToggleParticipation extends React.PureComponent {

  handleChange = (ev, { checked }) => {
    this.props.editEvent({
      open: checked
    })
  }

  render () {
    const { event } = this.props
    return (
      <Checkbox
        toggle
        label='Ouvrir les inscritptions'
        checked={event && event.open}
        onChange={this.handleChange}
      />
    )
  }
}

export default withEventEdit(ToggleParticipation)
