import React from 'react';

export default function withFacebookConnect(WrappedComponent) {
  return class extends React.Component {
    handleFacebookConnect = (cb) => {
      if (!window.FB) return cb(true);
      window.FB.login((response) => {
        if (response.authResponse) {
          cb(null , {
            facebookAccessToken: response.authResponse.accessToken,
            facebookId: response.authResponse.userID,
          })
        }
        else {
          console.log('User cancelled login or did not fully authorize.');
          cb(true);
         }
      }, {scope: 'public_profile,email'});

    }

    render() {
      return <WrappedComponent connectFacebook={this.handleFacebookConnect} {...this.props} />;
    }
  };
}
