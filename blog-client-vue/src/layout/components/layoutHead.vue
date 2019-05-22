<template>
  <a-layout-header class='blog-layout-header'>
    <div class='layout-head-row'>
      <a-input-search placeholder="输入文章标题进行搜索" @search="onSearch" style='width: 200px;' />
      <div v-if='false'>
        <a-button type="default" shape="circle" icon="form" class='add-article-btn'></a-button>
        <a-dropdown :trigger="['click']">
          <img class='user-photo' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="">
          <a-menu slot="overlay">
            <a-menu-item>个人中心</a-menu-item>
            <a-menu-divider />
            <a-menu-item>退出登录</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div v-else>
        <a-button type="primary" icon='user' @click="login">登录</a-button>
      </div>
    </div>

    <!-- 登录窗 -->
    <login-modal ref='login-modal'></login-modal>
  </a-layout-header>
</template>

<script>
  import {
    mapActions
  } from 'vuex';
  import loginModal from '@/components/loginModal'
  export default {
    name: 'layoutHead',
    components: {
      loginModal
    },
    data() {
      return {}
    },
    methods: {
      ...mapActions('article', ['getArticleList']),
      onSearch(value, event) {
        this.getArticleList({
          title: value
        });
      },
      login() {
        this.$refs['login-modal'].show();
      },
    }
  }
</script>

<style lang="less">
  .blog-layout-header.ant-layout-header {
    background: #333;
    padding: 0 30px;

    .layout-head-row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;

      .add-article-btn {
        vertical-align: middle;
        margin-right: 15px;
      }

      .user-photo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }
</style>