import React from 'react'

import ButtonUpload from 'components/web/misc/ButtonUpload'
import withCommunityUploadCover from 'hocs/mutations/withCommunityUploadCover'

class CommunityCover extends React.PureComponent {
  static state = {
    loading: false
  }

  uploadCover = (file) => {
    this.setState({ loading: true }, () => {
      this.props.uploadCover(file)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }))
    })
  }
  render() {
    const {
      src,
      style,
      children,
    } = this.props

    return (
      <div className="ui cover" style={{
        ...style,
        backgroundImage: src ? `url(${src})` : 'none'
      }}>

        <div className={`ui ${this.state && this.state.loading ? 'active' : ''} dimmer`} style={{ zIndex: 'initial' }}>
          <div className="ui text loader">Chargement...</div>
        </div>

        <div className="upload">
          <ButtonUpload
            style={{ padding: 5 }}
            icon="camera"
            disabled={this.state && this.state.loading}
            onChange={this.uploadCover}
          />
        </div>

        <div className="children">
          {children}
        </div>

        <style jsx>{`
          .ui.cover {
            height: 300px;
            background-color: #587483;
            background-position: center;
            background-size: cover;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
            border-radius: .28571429rem .28571429rem 0 0;
          }
          @media only screen and (max-width: 767px) {
            .ui.cover {
              border-radius: 0;
            }
          }

          .ui.cover > .upload {
            position: absolute;
            top: 10px;
            right: 10px;
          }

          .ui.cover > .children {
            position: absolute;
            bottom: 10px;
            right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default withCommunityUploadCover(CommunityCover);
