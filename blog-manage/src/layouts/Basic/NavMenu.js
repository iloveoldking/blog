import React from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import styles from './navMenu.less';
const { SubMenu } = Menu;

const NavMenu = props => {
  let { selectedKeys, handleOpenChange, openKeys } = props;
  return (
    <Menu
      theme='light'
      mode="inline"
      selectedKeys={[selectedKeys]}
      openKeys={openKeys}
      className={styles.navMenu}
      onOpenChange={handleOpenChange}
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
        <Menu.Item key="user"><Link to="/plat/user">用户管理</Link></Menu.Item>
        <Menu.Item key="article"><Link to="/plat/article">文章管理</Link></Menu.Item>
      </SubMenu>
      <SubMenu
        key="plat2"
        title={
          <span>
            <Icon type="setting" />
            <span>平台管理</span>
          </span>
        }
      >
        <Menu.Item key="user2"><Link to="/plat2/user2">用户管理</Link></Menu.Item>
        <Menu.Item key="article2"><Link to="/plat2/article2">文章管理</Link></Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default NavMenu
