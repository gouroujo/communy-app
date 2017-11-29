import React from 'react';

import ButtonUpload from 'components/web/misc/ButtonUpload'
import withCommunityUploadLogo from 'hocs/mutations/withCommunityUploadLogo'


class CommunityLogo extends React.PureComponent {
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
      style
    } = this.props

    return (
      <div className="ui logo" style={{
        ...style,
        backgroundImage: src ? `url(${src})` : 'none'
      }}>

        <div className={`ui ${this.state && this.state.loading ? 'active' : ''} dimmer`} style={{ zIndex: 'initial' }}>
          <div className="ui text loader">Chargement...</div>
        </div>

        <div className="upload">
          <ButtonUpload
            icon="camera"
            disabled={this.state && this.state.loading}
            onChange={this.uploadLogo}
          />
        </div>

        <style jsx>{`
          .ui.logo {
            height: 150px;
            width: 150px
            background-color: #587483;
            background-position: center;
            background-size: cover;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
            border: 2px solid white;
            border-radius: 10px;
          }

          .ui.logo > .upload {
            position: absolute;
            top: 10px;
            right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default withCommunityUploadLogo(CommunityLogo);
