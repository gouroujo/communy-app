import React from 'react';

import ButtonUpload from 'components/web/misc/ButtonUpload'
import withCommunityUploadLogo from 'hocs/mutations/withCommunityUploadLogo'


class CommunityLogo extends React.PureComponent {
  static state = {
    loading: false
  }

  uploadLogo = (file) => {
    this.setState({ loading: true }, () => {
      this.props.uploadLogo(file)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }))
    })
  }

  render() {
    const {
      src,
      style,
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
            style={{ padding: 5 }}
            icon="camera"
            disabled={this.state && this.state.loading}
            onChange={this.uploadLogo}
          />
        </div>

        <style jsx>{`
          .logo {
            height: 150px;
            width: 150px
            background-color: #fff;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
            border: 2px solid #e6e6e6;
            border-radius: 10px;
            margin: -60px 10px 0 50px;
          }

          .logo > .upload {
            position: absolute;
            top: 10px;
            right: 10px;
          }

          @media only screen and (max-width: 576px) {
            .logo {
              margin: -60px auto 0 auto;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withCommunityUploadLogo(CommunityLogo);
