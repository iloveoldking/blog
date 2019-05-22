<template>
  <a-layout class='blog-layout'>
    <layout-head></layout-head>
    
    <a-layout-content class='blog-layout-content'>
      <router-view></router-view>
    </a-layout-content>
    <a-back-top />
  </a-layout>
</template>

<script>
  import layoutHead from './components/layoutHead'
  export default {
    name: 'layout',
    components: {
      layoutHead
    }
  }
</script>

<style lang="less">
  .blog-layout.ant-layout {
    background: #fff;
  }
</style>