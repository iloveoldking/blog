<template>
  <a-modal title="用户登录" :visible="visible">
    <a-form :form="form">
      <a-form-item>
        <a-input v-decorator="accountDecorator" placeholder="账号" />
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="passwordDecorator" type="password" placeholder="密码" />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button>新用户注册</a-button>
      <a-button type="primary">登录</a-button>
    </template>
  </a-modal>
</template>

<script>
  export default {
    name: 'loginModal',
    data() {
      return {
        visible: false,
        confirmLoading: false,
        formLayout: 'horizontal',
        form: this.$form.createForm(this),
        accountDecorator: [
          'account',
          {
            rules: [{
              required: true,
              message: '请输入账号'
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
      handleOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      handleCancel(e) {
        this.visible = false
      }
    },
  };
</script>