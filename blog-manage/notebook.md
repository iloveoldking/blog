## 开发学习笔记

### 在umi项目中connect model
>connect会把dispatch自动挂载到组件的this.props上，state通过connect函数挂载
```
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';

@connect(({ user }) => ({
  name: user.name,
}))
class BlankLayout extends Component {
  state = {
    inputValue: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }
  
  render() {
    const { children, name } = this.props;
    return (
      <div className={styles.blankLayout}>
        {children}
      </div>
    )
  }
}

export default BlankLayout;
```
### 使用less可以继承
```
utils.less
.textOverflowMulti(@line: 3, @bg: #fff) {
  position: relative;
  max-height: @line * 1.5em;
  margin-right: -1em;
  padding-right: 1em;
  overflow: hidden;
  line-height: 1.5em;
  text-align: justify;

  &::before {
    position: absolute;
    right: 14px;
    bottom: 0;
    padding: 0 1px;
    background: @bg;
    content: '...';
  }

  &::after {
    position: absolute;
    right: 14px;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
    content: '';
  }
}

login.less
@import '../../utils/utils.less';
.test {
  color: red;
  .textOverflowMulti(2, transparent);
}
```
### 在css modules中覆盖antd的默认样式
>由于启用了css modules，如果不加:global{}包裹，样式覆盖则无法生效
```
.loginCard {
  width: 360px;

  :global {
    .ant-card-body {
      padding: 20px 15px;
    }
  }
}
```
### umi中的路由拦截器
>在路由配置中对指定的页面增加Routes: ['src/pages/Authorized']选项，这样在每次进入页面之前会先走一遍鉴权页面，在鉴权页面中判断是否有权限，并做出相应的处理
```
router.config.js
{
  path: '/',
  component: '../layouts/Basic',
  Routes: ['src/pages/Authorized'],
  routes: [{
    path: '/',
    redirect: '/user'
  }, {
    path: '/user',
    name: 'user',
    component: './User'
  }, {
    path: '/article',
    name: 'article',
    component: './Article'
  }]
}

pages/Authorized
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
```
### umi国际化处理
>在config/config.js/plugins中配置
```
locale: {
  default: 'zh-CN', //默认语言 zh-CN
  baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
  antd: true // 是否启用antd的<LocaleProvider />
}
```
### 分页器和表格数据分页的关系
>分页器的current和pageSize可以存储在modules中，作为分页器的展示数据，只是为了控制分页器显示，不涉及业务逻辑，表格数据分页翻页后要把modules中的分页器更新，并且请求新的数据