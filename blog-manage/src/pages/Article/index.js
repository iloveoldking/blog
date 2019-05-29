import React, { Component } from 'react'
import { connect } from 'dva';

@connect(({ article }) => ({
  article
}))
class User extends Component {
  render() {
    const name = this.props.article.name;
    return (
      <div>
        this is article page{name}
      </div>
    )
  }
}

export default User;
