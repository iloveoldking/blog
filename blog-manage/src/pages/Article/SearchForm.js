import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
// TODO 增加文章作者姓名模糊查询
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
      <Form layout="inline" autoComplete='off'>
        <Form.Item>
          {getFieldDecorator('title')(<Input placeholder="文章标题" />)}
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

