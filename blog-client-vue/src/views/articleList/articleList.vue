<template>
  <div class='article-list-container'>
    <!-- 左侧区域 -->
    <aside>
      <a-button v-if='userInfo' type="primary" icon="form" block @click='showArticleDrawer' class='blog-create-btn'>
        发表文章</a-button>
      <a-input-search placeholder="输入文章标题进行搜索" @search="onSearch" class='blog-search-input' />
      <a-card hoverable>
        <a-calendar :fullscreen="false" slot="cover" />
      </a-card>
    </aside>
    <!-- 右侧区域 -->
    <article>
      <a-list itemLayout="vertical" size="small" :dataSource="dataList">
        <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
          <template slot="actions">
            <span>
              <a-tooltip>
                <template slot='title'>{{item.collect?'取消收藏':'收藏'}}</template>
                <a-icon type="star" :theme="item.collect?'twoTone':'outlined'" @click='handleCollect(item, index)' />
              </a-tooltip>
              {{item.collectCount}}
            </span>
            <span>
              <a-tooltip>
                <template slot='title'>{{item.like?'取消点赞':'点赞'}}</template>
                <a-icon type="like" :theme="item.like?'twoTone':'outlined'" @click='handleLike(item, index)' />
              </a-tooltip>
              {{item.likeCount}}
            </span>
            <span>{{item.createdAt}}</span>
          </template>
          <a-list-item-meta>
            <router-link slot="title" :to="'/articleItem?id='+item._id" target='_blank'>{{item.title}}</router-link>
            <a-avatar v-if='item.user.photo' slot="avatar" :src="item.user.photo | completeAddress" />
            <a-avatar v-else slot="avatar">{{item.user.nickname | sliceOne}}</a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <a-divider v-if='total > 0' />
      <a-pagination :total="total" :hideOnSinglePage='true' @change='pageChange' class='article-page' />
    </article>
    <!-- 发布文章抽屉 -->
    <article-drawer ref='article-drawer' @articleSubmit='articleSubmit' :articleLoading='articleLoading' />
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import {
    collectArticle,
    likeArticle
  } from '@/services/article'
  import articleDrawer from '@/components/articleDrawer';
  export default {
    name: 'articleList',
    components: {
      articleDrawer
    },
    data() {
      return {
        articleLoading: false
      }
    },
    computed: {
      ...mapState('article', {
        dataList: state => state.dataList,
        total: state => state.total
      }),
      ...mapState('user', {
        userInfo: state => state.userInfo
      })
    },
    created() {
      this.setPageNum(1);
      this.getArticleList();
    },
    methods: {
      ...mapMutations('article', ['setPageNum']),
      ...mapActions('article', ['getArticleList', 'updateCurrentArticle', 'submitArticle']),
      onSearch(value, event) {
        this.setPageNum(1);
        this.getArticleList({
          title: value
        });
      },
      showArticleDrawer() {
        this.$refs['article-drawer'].show();
      },
      pageChange(page, pageSize) {
        this.setPageNum(page);
        this.getArticleList();
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
          this.setPageNum(1);
          this.getArticleList();
        }
      },
      async handleCollect(item, index) {
        if (this.userInfo) {
          const _id = item._id;
          await collectArticle({
            userId: this.userInfo._id,
            articleId: _id,
            collectFlag: !item.collect
          });
          this.updateCurrentArticle({
            _id,
            index
          });
        } else {
          this.$message.warning('请先登录账号')
        }
      },
      async handleLike(item, index) {
        if (this.userInfo) {
          const _id = item._id;
          await likeArticle({
            userId: this.userInfo._id,
            articleId: _id,
            likeFlag: !item.like
          });
          this.updateCurrentArticle({
            _id,
            index
          });
        } else {
          this.$message.warning('请先登录账号')
        }
      }
    }
  }
</script>


<style lang="less">
  @import './style';
</style>