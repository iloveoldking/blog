import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import styles from './navMenu.less';
const { SubMenu } = Menu;

@connect(({ menu }) => ({
  menu
}))
class NavMenu extends Component {

  handleClick = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/setSelectedKeys',
      payload: e.key
    })
    router.push(`/${e.key}`);
  };

  render() {
    const { defaultOpenKeys, selectedKeys } = this.props.menu;
    return (
      <Menu
        theme='light'
        onClick={this.handleClick}
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="inline"
        className={styles.navMenu}
      >
        <SubMenu
          key="plat"
          title={
            <span>
              <Icon type="setting" />
              <span>平台管理</span>
            </span>
          }
        >
          <Menu.Item key="user">用户管理</Menu.Item>
          <Menu.Item key="article">文章管理</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default NavMenu
