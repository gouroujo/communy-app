import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import UserDropdown from 'containers/User/Dropdown';

import withMailingCreate from 'hocs/mutations/withMailingCreate';

class MailingForm extends React.PureComponent {
  state = {
    receipients: this.props.receipients || [],
    body: this.props.body || '',
    subject: this.props.subject ||'',
    loading: false,
    success: false,
    error: false,
  }

  handleChangeReceipients = (receipients) => this.setState({ receipients })

  handleChange = (ev, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.setState({ loading: true, success: false, error: false });
    this.props.createAndSendMailing({
      body: this.state.body,
      subject: this.state.subject,
      receipients: this.state.receipients,
    })
    .catch((e) => {
      console.log(e);
      this.setState({ loading: false, success: false, error: true })
    })
  }
  render() {
    const {
      receipients,
      subject,
      body,
      loading,
      success,
      error,
    } = this.state

    const {
      communityId
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit} {...{loading, success, error}}>
        <Form.Field>
          <label>Destinataires</label>
          <UserDropdown
            placeholder="Rechercher..."
            communityId={communityId}
            value={receipients}
            onChange={this.handleChangeReceipients}
          />
        </Form.Field>
        <Form.Input
          name="subject"
          label='Sujet'
          placeholder="Sujet du message"
          type='text'
          value={subject}
          onChange={this.handleChange}
        />
        <Form.Field>
          <label>Message</label>
          <TextArea
            name="body"
            autoHeight
            placeholder='Message...'
            value={body}
            onChange={this.handleChange}
          />
        </Form.Field>

        <Form.Button type='submit'>Envoyer</Form.Button>
      </Form>
    )
  }
}

export default withMailingCreate(MailingForm)
