import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';

@Form.create()
class SearchForm extends Component {
  handleSubmit = () => {
    const { form, handleFormSearch } = this.props;
    handleFormSearch(form.getFieldsValue())
  };

  handleReset = () => {
    const { form, handleFormReset } = this.props;
    form.resetFields();
    handleFormReset();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" autocomplet='off'>
        <Form.Item>
          {getFieldDecorator('mobile')(<Input placeholder="手机号" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('nickname')(<Input placeholder="昵称" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ marginRight: '8px' }} onClick={this.handleSubmit}>查询</Button>
          <Button type="default" onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SearchForm;

