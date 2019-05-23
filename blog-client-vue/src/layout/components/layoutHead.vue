<template>
  <a-layout-header class='blog-layout-header'>
    <div class='layout-head-row'>
      <a-input-search placeholder="输入文章标题进行搜索" @search="onSearch" style='width: 200px;' />
      <div v-show='userInfo._id'>
        <a-button type="default" shape="circle" icon="form" class='add-article-btn' @click='showArticleDrawer'>
        </a-button>
        <a-dropdown :trigger="['click']">
          <img v-if='userInfo.photo' class='user-photo' :src="userInfo.photo | photoAddress" alt="">
          <a-avatar v-else class='user-photo'>{{userInfo.nickname | sliceOne}}
          </a-avatar>
          <a-menu slot="overlay">
            <a-menu-item>{{userInfo.nickname}}</a-menu-item>
            <a-menu-divider />
            <a-menu-item>个人中心</a-menu-item>
            <a-menu-item @click='loginOut'>退出登录</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div v-show='!userInfo._id' class='login-register-group'>
        <a-button icon='user-add' @click="showRegisterModal">注册</a-button>
        <a-button type="primary" icon='user' @click="showLoginModal">登录</a-button>
      </div>
    </div>

    <!-- 登录窗 -->
    <login-modal ref='login-modal' @loginSubmit='loginSubmit' :loginLoading='loginLoading' />

    <!-- 注册窗 -->
    <register-modal ref='register-modal' @registerSubmit='registerSubmit' :registerLoading='registerLoading' />

    <!-- 发布文章抽屉 -->
    <article-drawer ref='article-drawer' @articleSubmit='articleSubmit' :articleLoading='articleLoading' />
  </a-layout-header>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex';
  import loginModal from '@/components/loginModal';
  import registerModal from '@/components/registerModal';
  import articleDrawer from '@/components/articleDrawer';
  import {
    isCorrect
  } from '@/utils/tools'
  export default {
    name: 'layoutHead',
    components: {
      loginModal,
      registerModal,
      articleDrawer
    },
    data() {
      return {
        loginLoading: false,
        registerLoading: false,
        articleLoading: false
      }
    },
    computed: {
      ...mapState('user', {
        userInfo: state => state.userInfo
      })
    },
    methods: {
      ...mapActions('article', ['getArticleList', 'submitArticle']),
      ...mapActions('user', ['login', 'register']),
      ...mapMutations('user', ['loginOut']),
      onSearch(value, event) {
        this.getArticleList({
          title: value
        });
      },
      showLoginModal() {
        this.$refs['login-modal'].show();
      },
      showRegisterModal() {
        this.$refs['register-modal'].show();
      },
      showArticleDrawer() {
        this.$refs['article-drawer'].show();
      },
      async loginSubmit(values) {
        this.submitLoading = true;
        const res = await this.login(values);
        this.submitLoading = false;
        if (res) {
          this.$message.success('登录成功')
          this.$refs['login-modal'].hide();
        }
      },
      async registerSubmit(values) {
        this.registerLoading = true;
        const res = await this.register(values);
        this.registerLoading = false;
        if (res) {
          this.$message.success('注册成功')
          this.$refs['register-modal'].hide();
        }
      },
      async articleSubmit(values) {
        this.articleLoading = true;
        const res = await this.submitArticle({
          ...values,
          userId: this.userInfo._id
        });
        this.articleLoading = false;
        if (res) {
          this.$message.success('发表成功')
          this.$refs['article-drawer'].hide();
          this.getArticleList();
        }
      }
    }
  }
</script>

<style lang="less">
  @import './style';
</style>