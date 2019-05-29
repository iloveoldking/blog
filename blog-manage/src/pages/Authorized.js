import React, { Component, Fragment } from 'react'
import Redirect from 'umi/redirect';
import Cookies from 'js-cookie'


export class Authorized extends Component {
  render() {
    const { children } = this.props;
    const userInfo = Cookies.getJSON('user');
    if (userInfo) {
      return <Fragment>{children}</Fragment>
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default Authorized;
