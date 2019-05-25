<template>
  <a-drawer title="发表文章" :width="720" :visible="visible" :closable='false' :maskClosable='false'>
    <a-form :form="form" autocomplete='off' layout='vertical'>
      <a-form-item label="文章标题">
        <a-textarea v-decorator="titleDecorator" placeholder="文章标题" :autosize='{ minRows: 2}' />
      </a-form-item>
      <a-form-item label="文章内容">
        <a-textarea v-decorator="contentDecorator" placeholder="文章内容" :autosize='{ minRows: 6}' />
      </a-form-item>
    </a-form>
    <div class='bottom-button-group'>
      <a-button @click="hide">取消</a-button>
      <a-button @click="submit" type="primary" :loading='articleLoading'>发布</a-button>
    </div>
  </a-drawer>
</template>
<script>
  export default {
    name: 'articleDrawer',
    props: ['articleLoading'],
    data() {
      return {
        form: this.$form.createForm(this),
        visible: false,
        titleDecorator: [
          'title',
          {
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入文章标题'
            }, {
              max: 50,
              message: '文章标题长度不可以超过50字'
            }]
          }
        ],
        contentDecorator: [
          'content',
          {
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入文章内容'
            }]
          }
        ]
      }
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
        this.form.resetFields();
      },
      submit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('articleSubmit', values);
          }
        });
      }
    },
  }
</script>

<style lang="less">
  .bottom-button-group {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;

    button:nth-of-type(1) {
      margin-right: 10px;
    }
  }
</style>