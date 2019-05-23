<template>
  <div class='article-list-container'>
    <a-list itemLayout="vertical" size="small" :dataSource="dataList">
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <template slot="actions">
          <span>
            <a-icon type="star-o" />
            {{item.collectCount}}
          </span>
          <span>
            <a-icon type="like-o" />
            {{item.likeCount}}
          </span>
          <span>
            <a-icon type="message" />
            {{item.commentCount}}
          </span>
          <span>{{item.createdAt}}</span>
        </template>
        <a-list-item-meta>
          <router-link slot="title" :to="'/articleDetail?id='+item._id">{{item.title}}</router-link>
          <a-avatar v-if='item.user.photo' slot="avatar" :src="item.user.photo | photoAddress" />
          <a-avatar v-else slot="avatar">{{item.user.nickname | sliceOne}}</a-avatar>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <!-- TODO 增加分页加载功能 -->
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  export default {
    name: 'articleList',
    data() {
      return {
        
      }
    },
    computed: {
      ...mapState('article', {
        dataList: state => state.dataList
      })
    },
    created() {
      this.getArticleList();
    },
    methods: {
      ...mapActions('article', ['getArticleList'])
    }
  }
</script>


<style lang="less">
  @import './style';
</style>