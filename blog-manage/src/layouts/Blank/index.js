import React, { Component, Fragment } from 'react';

class BlankLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}

export default BlankLayout;
