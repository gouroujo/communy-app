import React from 'react';
import Moment from 'moment';

// import DateTime from 'components/DateTime';
import { Form } from 'semantic-ui-react'
import AddressInput from 'components/web/Address/Input'
import DatesInput from 'containers/Event/DatesInput'

// import NetworkDropdown from 'containers/Network/Dropdown';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.loading,
      event: this.props.event ||{},
      error: null,
      networkIds: (this.props.event && this.props.event.networks) ? (
        this.props.event.networks.map(n => n.id)
      ) : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event) {
      this.setState(prevState => ({
        ...prevState,
        loading: nextProps.loading,
        event: {
          ...nextProps.event,
          startTime: Moment(nextProps.event.startTime),
          endTime: Moment(nextProps.event.endTime),
        },
        networkIds: (nextProps.event && nextProps.event.networks) ? (
          nextProps.event.networks.map(n => n.id)
        ) : [],
      }))
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const error = [];
    if (!this.state.event.title) error.push('title');
    if (!this.state.event.parts) error.push('parts');
    if (error.length > 0) return this.setState({ error });

    this.setState({ loading: true, error: null });
    this.props.submit({
      title: this.state.event.title,
      description: this.state.event.description,
      parts: this.state.event.parts && this.state.event.parts.map(part => ({
        startTime: part.startTime.toDate(),
        endTime: part.endTime.toDate()
      })),
      address: this.state.event.address ? ({
        road: this.state.event.address.road,
        postcode: this.state.event.address.postcode,
        city: this.state.event.address.city,
        country_code: this.state.event.address.country_code
      }) : null,
      networkIds: this.state.networkIds,
    }).then(res => {
      this.setState({ loading: false }, this.props.callback ? () => this.props.callback(res) : null);
      return res;
    });
  }

  handleChange = (ev, { name, value }, cb) => {
    return this.setState(prevState => ({
      ...prevState,
      event: {
        ...prevState.event,
        [name]: value,
      }
    }), cb)
  }

  handleChangeNetworks = (networkIds, cb) => {
    return this.setState({ networkIds }, cb)
  }

  handleChangeDate = ({ startTime, endTime }) => {
    return this.setState(prevState => ({
      ...prevState,
      event: {
        ...prevState.event,
        parts: [{
          startTime,
          endTime,
        }]
      }
    }))
  }

  render() {
    const {
      event,
      // networkIds,
      loading,
      error,
    } = this.state;
    const {
      // organisationId,
      submitText = 'Envoyer'
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} loading={loading} error={!!error} style={{ margin: '0 2em'}}>
        <Form.Input
          error={error && error.includes('title')}
          required
          name="title"
          label="Titre"
          placeholder="Titre de l'activité"
          value={event.title ||''}
          onChange={this.handleChange}
          focus
        />
        <Form.Field required>
          <DatesInput name="parts" value={{
            startTime: event.startTime,
            endTime: event.endTime
          }} onChange={this.handleChangeDate}/>
        </Form.Field>
        <AddressInput name='address' value={event.address || {}} onChange={this.handleChange}/>
        <Form.TextArea
          autoHeight
          name="description"
          label='Description'
          placeholder='Informations pratiques, animations prévues, ...'
          value={event.description ||''}
          onChange={this.handleChange}
        />
        {/* <Form.Field>
          <label>Ouvrir l'activité aux membres des réseaux partenaires</label>
          <NetworkDropdown
            organisationId={organisationId}
            placeholder="Recercher des réseaux"
            networks={event.networks}
            value={networkIds}
            onChange={this.handleChangeNetworks}
          />
        </Form.Field> */}

        <Form.Group>
          <Form.Button>{submitText}</Form.Button>
          {this.props.children}
        </Form.Group>

      </Form>
    )
  }
}
