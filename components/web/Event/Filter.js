import React from 'react'
import { Button, Transition } from 'semantic-ui-react'

export default class EventFilterComponent extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })


  render() {
    const { visible } = this.state

    return (
      <div>
        <Button
          active={visible}
          content="Filtrer"
          onClick={this.toggleVisibility} />
        <Transition visible={visible} animation='slide down' duration={200}>
          <div>YO</div>
        </Transition>
      </div>
    )
  }
}
