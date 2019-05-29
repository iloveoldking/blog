import React, { Component } from 'react'
import { connect } from 'dva';

@connect(({ user }) => ({
  user
}))
class User extends Component {
  render() {
    const name = this.props.user.name;
    return (
      <div>
        this is user page{name}
      </div>
    )
  }
}

export default User;
