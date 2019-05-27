<template>
  <a-layout-header class='blog-layout-header'>
    <div class='layout-head-row'>
      <div v-if='userInfo'>
        <a-dropdown :trigger="['click']">
          <a-badge dot :count="5">
            <a-avatar v-if='userInfo.photo' class='user-photo' :src='userInfo.photo | completeAddress' />
            <a-avatar v-else class='user-photo'>{{userInfo.nickname | sliceOne}}</a-avatar>
          </a-badge>
          <a-menu slot="overlay">
            <a-menu-item>{{userInfo.nickname}}</a-menu-item>
            <a-menu-divider />
            <a-menu-item>个人中心<a-badge dot :count="5" /></a-menu-item>
            <a-menu-item @click='handleLoginOut'>退出登录</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <div v-else class='login-register-group'>
        <a-button icon='user-add' @click="showRegisterModal">注册</a-button>
        <a-button type="primary" icon='login' @click="showLoginModal">登录</a-button>
      </div>
    </div>
    <!-- 登录窗 -->
    <login-modal ref='login-modal' @loginSubmit='loginSubmit' :loginLoading='loginLoading' />
    <!-- 注册窗 -->
    <register-modal ref='register-modal' @registerSubmit='registerSubmit' :registerLoading='registerLoading' />
  </a-layout-header>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'vuex';
  import {
    getCookiesUserId
  } from '@/utils/tools';
  import loginModal from '@/components/loginModal';
  import registerModal from '@/components/registerModal';
  import {
    isCorrect
  } from '@/utils/tools'
  export default {
    name: 'layoutHead',
    components: {
      loginModal,
      registerModal
    },
    data() {
      return {
        loginLoading: false,
        registerLoading: false,
      }
    },
    computed: {
      ...mapState('user', {
        userInfo: state => state.userInfo
      })
    },
    methods: {
      ...mapMutations('article', ['setPageNum']),
      ...mapActions('article', ['getArticleList']),
      ...mapMutations('user', ['loginOut']),
      ...mapActions('user', ['login', 'register']),
      showLoginModal() {
        this.$refs['login-modal'].show();
      },
      showRegisterModal() {
        this.$refs['register-modal'].show();
      },
      handleLoginOut() {
        this.loginOut();
        this.getFirstPageArticle();
      },
      async loginSubmit(values) {
        this.submitLoading = true;
        const res = await this.login(values);
        this.submitLoading = false;
        if (res) {
          this.$message.success('登录成功')
          this.$refs['login-modal'].hide();
          this.getFirstPageArticle();
        }
      },
      async registerSubmit(values) {
        this.registerLoading = true;
        const res = await this.register(values);
        this.registerLoading = false;
        if (res) {
          this.$message.success('注册成功')
          this.$refs['register-modal'].hide();
          this.getFirstPageArticle();
        }
      },
      getFirstPageArticle() {
        this.setPageNum(1);
        this.getArticleList();
      }
    }
  }
</script>

<style lang="less">
  @import './style';
</style>