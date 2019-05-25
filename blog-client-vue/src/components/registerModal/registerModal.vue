<template>
  <a-modal title="用户注册" :visible="visible" width='420px' @cancel='hide' class='register-modal'>
    <a-form :form="form" autocomplete='off'>
      <a-form-item>
        <a-input v-decorator="mobileDecorator" placeholder="手机号">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="passwordDecorator" type="password" placeholder="密码">
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="nicknameDecorator" placeholder="昵称">
          <a-icon slot="prefix" type="smile" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-upload name="file" listType="picture-card" class="avatar-uploader" :showUploadList="false"
          :beforeUpload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="uploading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button @click='hide'>取消</a-button>
      <a-button type="primary" @click='register' :loading='registerLoading'>注册</a-button>
    </template>
  </a-modal>
</template>

<script>
  import {
    getBase64
  } from '@/utils/tools';
  import userConfig from '@/config'
  import axios from 'axios';
  import md5 from 'md5';
  export default {
    name: 'registerModal',
    props: ['registerLoading'],
    data() {
      return {
        visible: false,
        formLayout: 'horizontal',
        form: this.$form.createForm(this),
        photoFile: null,
        uploading: false,
        imageUrl: '',
        mobileDecorator: [
          'mobile',
          {
            validateTrigger: 'blur',
            rules: [{
              required: true,
              message: '请输入手机号'
            }, {
              pattern: /^1\d{10}$/,
              message: '手机号格式不正确'
            }]
          }
        ],
        passwordDecorator: [
          'password',
          {
            validateTrigger: 'blur',
            rules: [{
              required: true,
              message: '请输入密码'
            }, {
              pattern: /^[a-zA-Z0-9]{6,20}$/,
              message: '密码格式不正确，请输入6-10字母、数字组合'
            }]
          }
        ],
        nicknameDecorator: [
          'nickname',
          {
            validateTrigger: 'blur',
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入昵称'
            }, {
              pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/,
              message: '昵称格式不正确，请输入2-10汉字、字母、数字组合'
            }]
          }
        ],
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
        this.form.resetFields();
        this.photoFile = null;
        this.imageUrl = '';
      },
      register() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            // TODO 这里需要将密码采用md5加密
            values.password = md5(values.password);
            if (this.photoFile) {
              this.uploading = true;
              const formData = new FormData();
              formData.append('file', this.photoFile);
              const uploadRes = await axios({
                method: 'post',
                url: `${userConfig.baseURL}/upload`,
                headers: {
                  'Content-Type': 'application/formdata'
                },
                data: formData
              });
              this.uploading = false;
              this.$emit('registerSubmit', {
                ...values,
                photo: uploadRes.data.path
              });
            } else {
              this.$emit('registerSubmit', values);
            }
          }
        });
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPng = file.type === 'image/png';
        if (!isJPG && !isPng) {
          this.$message.error('头像图片格式仅限jpg、png')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('图片大小仅限于2M之内')
        }
        if ((isJPG || isPng) && isLt2M) {
          this.photoFile = file;
          getBase64(file, imageUrl => {
            this.imageUrl = imageUrl
          })
        }
        return false;
      },
    },
  };
</script>


<style lang="less">
  @import './style';
</style>