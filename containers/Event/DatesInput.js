import React from 'react'
import moment from 'moment'
import DateRangePicker from 'components/web/Event/DateRangePicker'
import { Button } from 'semantic-ui-react'

export default class EventDatesInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      parts: props.value || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && !this.state.parts) {
      this.setState({ parts : nextProps.value })
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    const m = moment(startDate)
    const parts = []

    while (m.isSameOrBefore(endDate)) {
      parts.push({
        startTime: moment(m).startOf('day'),
        startInput: moment(m).startOf('day').format('HH:mm:ss'),
        endTime: moment(m).endOf('day'),
        endInput: moment(m).endOf('day').format('HH:mm:ss')
      })
      m.add(1, 'day');
    }
    this.setState({
      startDate,
      endDate,
      parts
    }, this.handleChange)
  }

  onStartTimeChange = (partIndex, value) => {
    const parts = [...this.state.parts]
    const v = value.split(':')
    parts[partIndex].startTime.hour(v[0]).minute(v[1])
    parts[partIndex].startInput = value
    this.setState({
      parts
    }, this.handleChange)
  }
  onEndTimeChange = (partIndex, value) => {
    const parts = [...this.state.parts]
    const v = value.split(':')
    parts[partIndex].endTime.hour(v[0]).minute(v[1])
    parts[partIndex].endInput = value
    this.setState({
      parts
    }, this.handleChange)
  }
  onRemovePart = (i) => {
    this.setState(prevState => {
      const parts = [...prevState.parts]
      parts.splice(i, 1)
      if (parts.length === 0) {
        return {
          parts,
          startDate: null,
          endDate: null,
        }
      }
      return { parts }
    }, this.handleChange)
  }

  handleChange = () => {
    return this.props.onChange(null, {
      name: this.props.name,
      value: this.state.parts,
    })
  }

  render() {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ width: 'auto', textAlign: 'right' }}>
          {this.state.parts.map((part, i) => (
            <div key={i} className="part">
              <span>le</span>
              <input
                type="date"
                value={part.date}
                onChange={(ev) => this.onDateChange(i, ev.target.value)}
              />
              <span>de </span>
              <input
                type="time"
                value={part.startInput}
                onChange={(ev) => this.onStartTimeChange(i, ev.target.value)}
              />
              <span>à</span>
              <input
                type="time"
                value={part.endInput}
                onChange={(ev) => this.onEndTimeChange(i, ev.target.value)}
              />
              <Button basic onClick={() => this.onRemovePart(i)} type="button" icon="trash" negative />

            </div>
          ))}
          <style jsx>{`
            .part {
              max-width: 500px;
              /*display: inline-block;*/
            }
            .part > input {
              width: 100px;
              margin: 0 10px;
            }
            .part > span {
              line-height: 38px;
            }
          `}</style>
        </div>



      </div>
    )
  }
}
