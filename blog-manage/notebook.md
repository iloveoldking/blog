## 开发学习笔记

### 在umi项目中connect model
```
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';

class BlankLayout extends Component {
  state = {
    newTags: [],
    inputVisible: false,
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

export default connect(({ user }) => ({
  name: user.name,
}))(BlankLayout);
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
### 在cssModules中覆盖antd的默认样式(:global)
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