<template>
  <a-modal title="用户登录" :visible="visible" width='420px' @cancel='hide' class='login-modal'>
    <a-form :form="form" autocomplete='off'>
      <a-form-item>
        <a-input v-decorator="mobileDecorator" placeholder="手机号" @keyup.enter='login'>
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item class='password-form-item'>
        <a-input v-decorator="passwordDecorator" type="password" placeholder="密码" @keyup.enter='login'>
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button type="primary" block @click='login' :loading='loginLoading'>登录</a-button>
    </template>
  </a-modal>
</template>

<script>
  export default {
    name: 'loginModal',
    props: ['loginLoading'],
    data() {
      return {
        visible: false,
        formLayout: 'horizontal',
        form: this.$form.createForm(this),
        mobileDecorator: [
          'mobile',
          {
            rules: [{
              required: true,
              message: '请输入手机号'
            }]
          }
        ],
        passwordDecorator: [
          'password',
          {
            rules: [{
              required: true,
              message: '请输入密码'
            }]
          }
        ]
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
        this.form.resetFields();
      },
      login() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('loginSubmit', values);
          }
        });
      }
    },
  };
</script>


<style lang="less">
  @import './style';
</style>