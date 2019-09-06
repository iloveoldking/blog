import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import { Menu, Dropdown, Icon } from 'antd';
import Cookies from 'js-cookie'
import styles from './basicLayout.less';
import NavMenu from './NavMenu';
import { getDefaultOpenKeys, getDefaultSelectedKeys } from './SiderMenuUtils';

@connect(({ global }) => ({
  global
}))
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultOpenKeys(props),
    };
  }

  logout = () => {
    Cookies.remove('user');
    router.replace('/login');
  }

  handleOpenChange = openKeys => {
    this.setState({
      openKeys: [openKeys.pop()]
    })
  };

  render() {
    const { openKeys } = this.state;
    const { children, global, location: { pathname } } = this.props;
    const { nickname } = global.info;
    const selectedKeys = getDefaultSelectedKeys(pathname)

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
          <aside><NavMenu handleOpenChange={this.handleOpenChange} openKeys={openKeys} selectedKeys={selectedKeys} /></aside>
          <article>{children}</article>
        </div>
      </div>
    )
  }
}

export default BasicLayout;
