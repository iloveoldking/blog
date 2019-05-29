import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import LoginForm from './LoginForm';
import styles from './login.less'

@connect(({ global }) => ({
  global
}))
class Login extends Component {

  loginSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/login',
      payload: {
        ...values
      },
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Card size="small" title="用户登录" className={styles.loginCard} hoverable>
          <LoginForm loginSubmit={this.loginSubmit} />
        </Card>
      </div>
    )
  }
}

export default Login;
