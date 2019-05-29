import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import { Menu, Dropdown, Icon } from 'antd';
import Cookies from 'js-cookie'
import styles from './basicLayout.less';
import NavMenu from './NavMenu';

@connect(({ global }) => ({
  global
}))
class BasicLayout extends Component {

  logout = () => {
    Cookies.remove('user');
    router.replace('/login');
  }

  render() {
    const { children, global } = this.props;
    const { nickname } = global.info;
    const menu = (
      <Menu>
        <Menu.Item>{nickname}</Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.logout}>退出登录</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.container}>
        <header>
          <Dropdown overlay={menu} trigger={['click']}>
            <span className={styles.nickname}>{nickname}<Icon type="caret-down" /></span>
          </Dropdown>
        </header>
        <div className={styles.main}>
          <aside><NavMenu /></aside>
          <article>{children}</article>
        </div>
      </div>
    )
  }
}

export default BasicLayout;
