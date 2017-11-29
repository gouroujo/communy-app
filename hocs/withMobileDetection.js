import React from 'react';

export default ComposedComponent => (
  class WithMobileDetection extends React.Component {
    static displayName = `WithMobileDetection(${ComposedComponent.displayName})`

    isMobile = () => (
      process.browser ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 480 : false
    )

    render() {
      return <ComposedComponent isMobile={this.isMobile()} {...this.props} />;
    }
  }
)
