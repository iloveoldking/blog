import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Upload, message } from 'antd';
import md5 from 'md5';
import axios from 'axios'
import { getBase64 } from '@/utils/tools';
import { baseUrl } from '@/defaultSettings'

@Form.create()
class CreateModal extends Component {

  state = {
    photoFile: null,
    imageUrl: ''
  }

  onOk = () => {
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        values.password = md5(values.password);
        const photoFile = this.state.photoFile;
        if (photoFile) {
          const formData = new FormData();
          formData.append('file', photoFile);
          const uploadRes = await axios({
            method: 'post',
            url: `${baseUrl}/upload`,
            headers: {
              'Content-Type': 'application/formdata'
            },
            data: formData
          });
          values.photo = uploadRes.data.path
        }
        this.props.handleCreateOk(values);
      }
    })
  }

  onCancel = () => {
    this.props.hideCreateModal();
  }

  afterClose = () => {
    this.setState({
      photoFile: null,
      imageUrl: ''
    })
  }

  render() {
    const { createModalVisible, form: { getFieldDecorator } } = this.props;
    const { imageUrl } = this.state;

    const mobileDecorator = {
      validateTrigger: 'onBlur',
      rules: [{ required: true, message: '请输入手机号' }, {
        pattern: /^1\d{10}$/,
        message: '手机号格式不正确'
      }],
    }

    const passwordDecorator = {
      validateTrigger: 'onBlur',
      rules: [{ required: true, message: '请输入密码' }, {
        pattern: /^[a-zA-Z0-9]{6,20}$/,
        message: '密码格式不正确，请输入6-10字母、数字组合'
      }],
    }

    const nicknameDecorator = {
      validateTrigger: 'onBlur',
      rules: [{ required: true, message: '请输入昵称' }, {
        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/,
        message: '昵称格式不正确，请输入2-10汉字、字母、数字组合'
      }],
    }

    const beforeUpload = file => {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      if (!isJPG && !isPng) {
        message.error('头像图片格式仅限jpg、png')
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小仅限于2M之内')
      }
      if ((isJPG || isPng) && isLt2M) {
        this.setState({
          photoFile: file
        })
        getBase64(file, imageUrl => {
          this.setState({
            imageUrl: imageUrl
          })
        })
      }
      return false;
    }

    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div>上传头像</div>
      </div>
    );

    return (
      <Modal
        title="新增用户"
        visible={createModalVisible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        afterClose={this.afterClose}
        destroyOnClose={true}
      >
        <Form autocomplet='off'>
          <Form.Item>
            {getFieldDecorator('mobile', mobileDecorator)(<Input placeholder="手机号" prefix={<Icon type="user" />} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', passwordDecorator)(<Input type='password' placeholder="密码" prefix={<Icon type="lock" />} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('nickname', nicknameDecorator)(<Input placeholder="昵称" prefix={<Icon type="smile" />} />)}
          </Form.Item>
          <Form.Item>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? <img src={imageUrl} style={{ maxWidth: '128px' }} alt="avatar" /> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default CreateModal;