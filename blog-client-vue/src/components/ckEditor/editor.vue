<template>
  <ckeditor :value="editorData" :editor="editor" :config="editorConfig" @input="handleEditorChange"></ckeditor>
</template>

<script>
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
  import userConfig from '@/config';
  const hasProp = (instance, prop) => {
    const $options = instance.$options || {};
    const propsData = $options.propsData || {};
    return prop in propsData;
  };
  export default {
    name: 'ckEditor',
    props: ['value'],
    data() {
      const value = this.value || '';
      return {
        editor: ClassicEditor,
        editorConfig: {
          toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'imageUpload',
            'insertTable', '|', 'undo', 'redo'
          ],
          language: 'zh-cn',
          ckfinder: {
            uploadUrl: `${userConfig.baseURL}/editorUpload`
          }
        },
        editorData: value,
      }
    },
    watch: {
      value(val = '') {
        this.editorData = val;
      },
    },
    methods: {
      triggerChange(changedValue) {
        this.$emit('change', changedValue);
      },
      handleEditorChange(editorData) {
        if (!hasProp(this, 'value')) {
          this.editorData = editorData;
        }
        this.triggerChange(editorData);
      }
    },
  }
</script>


<style lang="less">
  .ck-editor__main {
    &>.ck-editor__editable {
      min-height: 300px;
    }
  }
</style>