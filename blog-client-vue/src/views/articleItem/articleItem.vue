<template>
  <div class='detail-container'>
    <a-card :title="title" :bordered='false'>

      <div slot="extra">
        <span>{{user.createdAt}}</span>
        <a-divider type="vertical" />
        <span>{{user.nickname}}</span>
        <!-- <a-divider type="vertical" />
        <a-button type="primary" icon='bars' @click='goToList'></a-button> -->
      </div>
      {{content}}
    </a-card>
    <a-divider />
  </div>
</template>


<script>
  import {
    findArticleById
  } from '@/services/article';
  import {
    isCorrect
  } from '@/utils/tools';
  export default {
    name: 'articleItem',
    data() {
      return {
        title: '',
        content: '',
        user: {
          nickname: ''
        },
        createdAt: ''
      }
    },
    created() {
      this.getItem();
    },
    methods: {
      async getItem() {
        const res = await findArticleById({
          id: this.$route.query.id
        });
        if (isCorrect(res)) {
          this.title = res.data.title;
          this.content = res.data.content;
          this.createdAt = res.data.createdAt;
          this.user = res.data.user;
        } else {
          this.title = '未查询到该文章';
        }
      },
      goToList() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style lang="less">
  @import './style';
</style>