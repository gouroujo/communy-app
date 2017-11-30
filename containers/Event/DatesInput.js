import React from 'react'
import moment from 'moment'
// import DateRangePicker from 'components/web/Event/DateRangePicker'
import { Form } from 'semantic-ui-react'

export default class EventDatesInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dateInput: props.startTime,
      startTime: props.startTime,
      startInput: props.startTime,
      endTime: props.endTime,
      endInput: props.endTime,
    }
  }

  onDateChange = (ev) => {
    const { value } = ev.target
    this.setState(prevState => {
      const state = {}
      if (prevState.startTime) {
        state.startTime = moment(value).hour(prevState.startTime.hour()).minute(prevState.startTime.minute())
      } else {
        state.startTime = moment(value).startOf('day')
      }

      if (prevState.endTime) {
        state.endTime = moment(value).hour(prevState.endTime.hour()).minute(prevState.endTime.minute())
      } else {
        state.endTime = moment(value).startOf('day')
      }
      return {
        ...state,
        dateInput: value
      }
    }, this.handleChange)
  }

  onStartTimeChange = (ev) => {
    const { value } = ev.target
    this.setState(prevState => {
      const v = value.split(':')
      return {
        startTime: prevState.startTime.hour(v[0]).minute(v[1]),
        startInput: value
      }
    }, this.handleChange)
  }

  onEndTimeChange = (ev) => {
    const { value } = ev.target
    this.setState(prevState => {
      const v = value.split(':')
      return {
        endTime: prevState.endTime.hour(v[0]).minute(v[1]),
        endInput: value
      }
    }, this.handleChange)
  }

  handleChange = () => {
    return this.props.onChange({
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    })
  }

  render() {
    return (
      <Form.Group widths='equal'>
        <Form.Input
          type="date"
          value={this.state.dateInput || ''}
          onChange={this.onDateChange}
          label='Date' placeholder='JJ/MM/AAAA' />
        <Form.Input
          disabled={!this.state.startTime}
          type="time"
          value={this.state.startInput || ''}
          onChange={this.onStartTimeChange}
          label='Début' placeholder='HH:MM' />
        <Form.Input type="time"
          disabled={!this.state.endTime}
          value={this.state.endInput || ''}
          onChange={this.onEndTimeChange}
          label='Fin' placeholder='HH:MM' />
      </Form.Group>
    )
  }
}
