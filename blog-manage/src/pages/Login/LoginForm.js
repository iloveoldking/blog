import React, { Component } from 'react';
import md5 from 'md5';
import { Form, Icon, Input, Button } from 'antd';

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { loginSubmit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        loginSubmit({
          mobile: values.mobile,
          password: md5(values.password)
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete='off'>
        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [{ required: true, message: '请输入帐号' }],
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" block>登录</Button>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;