import React from 'react'
import { Button } from 'semantic-ui-react'

export default class UploadButton extends React.PureComponent {
  onClickButton = (ev) => {
    ev.preventDefault();
    this.state.ref.click();
  }

  onChange = (ev) => {
    if (!this.props.onChange) return;
    this.props.onChange(ev.target.files[0])
  }

  handleRef = (ref) => this.setState({ ref })

  render () {

    const {
      onChange,
      ...props
    } = this.props

    return (
      <div>
        <Button onClick={this.onClickButton} {...props} />
        <input ref={this.handleRef} type="file" style={{ display: 'none' }} onChange={this.onChange} />
      </div>
    )
  }
}
