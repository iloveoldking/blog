<template>
  <div class='detail-container'>
    <!-- 文章内容 -->
    <a-card :title="title" :bordered='false'>
      <div slot="extra">
        <span>{{createdAt}}</span>
        <a-divider type="vertical" />
        <span>{{user.nickname}}</span>
      </div>
      <div v-html='content'></div>
    </a-card>
    <!-- 评论 -->
    <a-divider orientation="left">评论专区</a-divider>
    <div class='comment-container'>
      <!-- 发表评论 -->
      <div class='comment-tools'>
        <a-comment v-if='userInfo'>
          <a-avatar v-if='userInfo.photo' slot="avatar" :src="userInfo.photo | completeAddress" alt="" />
          <a-avatar v-else slot="avatar">{{userInfo.nickname | sliceOne}} </a-avatar>
          <div slot="content">
            <a-form :form="form">
              <a-form-item>
                <a-textarea :autosize="{minRows: 2}" v-decorator="commentDecorator"></a-textarea>
              </a-form-item>
              <a-form-item class='submit-form-item'>
                <a-button :loading="submitting" @click="handleSubmit" type="primary">发表评论</a-button>
              </a-form-item>
            </a-form>
          </div>
        </a-comment>
      </div>
      <!--评论列表 -->
      <a-list class="comment-list" size="small" itemLayout="horizontal" :dataSource="commentData"
        :locale='{emptyText:"暂无任何评论"}'>
        <div slot="header" v-if='commentData.length > 0'>
          <a-icon type="message" style='margin-right:10px;' />{{commentData.length}}条评论</div>
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment :author="item.user.nickname">
            <a-avatar v-if='item.user.photo' slot="avatar" :src="item.user.photo | completeAddress" alt="" />
            <a-avatar v-else slot="avatar">{{item.user.nickname | sliceOne}} </a-avatar>
            <template slot="actions" v-if='userInfo'>
              <span @click='showReplyModal(item._id, item.user.nickname)'>回复</span>
            </template>
            <p slot="content" class='comment-content'>{{item.content}}</p>
            <span slot="datetime">{{index + 1}}楼
              <a-divider type="vertical" />{{item.createdAt}}</span>
            <!-- 回复列表 -->
            <a-comment :author="replyItem.user.nickname" v-for="replyItem in item.reply" :key='replyItem._id'>
              <a-avatar v-if='replyItem.user.photo' slot="avatar" :src="replyItem.user.photo | completeAddress"
                alt="" />
              <a-avatar v-else slot="avatar">{{replyItem.user.nickname | sliceOne}} </a-avatar>
              <template slot="actions" v-if='userInfo'>
                <span @click='showReplyModal(replyItem.commentId, replyItem.user.nickname)'>回复</span>
              </template>
              <p slot="content" class='comment-content'>{{replyItem.content}}</p>
              <span slot="datetime">回复{{replyItem.commentAuthor}}<a-divider type="vertical" />{{replyItem.createdAt}}</span>
            </a-comment>
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
    <!-- 回复弹框 -->
    <reply-modal ref='reply-modal' @replySubmit='replySubmit' :loginLoading='replyLoading' />
  </div>
</template>


<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex';
  import {
    findArticleById,
    commentArticle
  } from '@/services/article';
  import {
    isCorrect
  } from '@/utils/tools';
  import {
    scrollIntoView
  } from 'scroll-js';
  import replyModal from '@/components/replyModal'
  export default {
    name: 'articleItem',
    components: {
      replyModal
    },
    data() {
      return {
        title: '',
        content: '',
        user: {
          nickname: ''
        },
        createdAt: '',
        commentData: [],
        submitting: false,
        form: this.$form.createForm(this),
        commentDecorator: [
          'content',
          {
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入评论内容'
            }]
          }
        ],
        replyLoading: false,
        commentId: '',
        commentAuthor: ''
      }
    },
    computed: {
      ...mapState('user', {
        userInfo: state => state.userInfo
      })
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
          this.commentData = res.data.commentArray;
        } else {
          this.title = '未查询到该文章';
        }
      },
      goToList() {
        this.$router.go(-1);
      },
      handleSubmit() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.submitting = true;
            const res = await commentArticle({
              ...values,
              userId: this.userInfo._id,
              articleId: this.$route.query.id
            })
            this.submitting = false;
            if (isCorrect(res)) {
              this.$message.success('发表成功');
              this.form.resetFields();
              await this.getItem();
              this.$nextTick(() => {
                const commentList = document.getElementsByClassName('comment-list')[0];
                const listItems = commentList.getElementsByClassName('ant-list-item');
                const lastItem = listItems[listItems.length - 1];
                scrollIntoView(lastItem, document.body, {
                  behavior: 'smooth'
                });
              })
            } else {
              this.$message.error('发表失败');
            }
          }
        });
      },
      showReplyModal(commentId, commentAuthor) {
        this.$refs['reply-modal'].show();
        this.commentId = commentId;
        this.commentAuthor = commentAuthor;
      },
      async replySubmit(values) {
        this.replyLoading = true;
        const res = await commentArticle({
          ...values,
          userId: this.userInfo._id,
          commentId: this.commentId,
          commentAuthor: this.commentAuthor
        });
        this.replyLoading = false;
        if (isCorrect(res)) {
          this.$message.success('发表成功')
          this.$refs['reply-modal'].hide();
          await this.getItem();
        } else {
          this.$message.error('发表失败');
        }
      }
    },
  }
</script>

<style lang="less">
  @import './style';
</style>