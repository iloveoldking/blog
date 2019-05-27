<template>
  <a-modal title="回复评论" :visible="visible" width='560px' @cancel="hide" :destroyOnClose='true' class='reply-modal'>
    <a-form :form="form" autocomplete='off'>
      <a-form-item>
        <a-textarea :autosize="{minRows: 4}" placeholder="请输入回复内容" v-decorator="replyDecorator"></a-textarea>
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button type="default" @click='hide'>取消</a-button>
      <a-button type="primary" @click='reply' :loading='replyLoading'>发表</a-button>
    </template>
  </a-modal>
</template>

<script>
  export default {
    name: 'replyModal',
    props: ['replyLoading'],
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        replyDecorator: [
          'content',
          {
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入回复内容'
            }]
          }
        ],
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      reply() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('replySubmit', values);
          }
        });
      },
      hide() {
        this.visible = false;
      },
    },
  }
</script>

<style lang="less">
  .reply-modal {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
</style>