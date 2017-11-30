import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ButtonWithConfirm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  handleOpen = () => this.setState({
    modalOpen: true,
  })

  handleClose = () => this.setState({
    modalOpen: false,
  })

  handleConfirm = () => {
    this.props.onConfirm();
    this.setState({
      modalOpen: false,
    })
  }

  render() {

    const {
      children,
      modalIcon,
      modalTitle,
      modalContent,
      confirmText,
      cancelText,
      onConfirm,
      ...props
    } = this.props;

    return (
      <Modal
        trigger={(
          <Button onClick={this.handleOpen} {...props}>
            {children}
          </Button>
        )}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon={modalIcon} content={modalTitle} />
        <Modal.Content content={modalContent} />
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleConfirm}>
            <Icon name='checkmark' /> {confirmText || 'Confirmer'}
          </Button>
          <Button basic color='red' inverted onClick={this.handleClose}>
            <Icon name='remove' /> {cancelText || 'Annuler'}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
