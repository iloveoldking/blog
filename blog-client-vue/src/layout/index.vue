<template>
  <a-layout class='blog-layout'>
    <layout-head></layout-head>

    <a-layout-content class='blog-layout-content'>
      <aside>
        <a-card hoverable>
          <a-calendar :fullscreen="false" slot="cover" />
          <template class="ant-card-actions" slot="actions">

            <div>
              <a-icon type="setting" spin style='margin-right:5px;'/>
              <span>{{currentTime}}</span>
            </div>
          </template>
        </a-card>
      </aside>
      <article>
        <router-view></router-view>
      </article>
    </a-layout-content>

    <a-back-top />
  </a-layout>
</template>

<script>
  import moment from 'moment';
  import layoutHead from './components/layoutHead';
  import {
    setInterval
  } from 'timers';
  export default {
    name: 'layout',
    components: {
      layoutHead
    },
    data() {
      return {
        currentTime: ''
      }
    },
    created() {
      setInterval(() => {
        this.currentTime = moment().format('HH:mm:ss')
      }, 100)
    }
  }
</script>

<style lang="less">
  .blog-layout.ant-layout {
    background: #fff;

    .blog-layout-content {
      display: flex;

      aside {
        width: 340px;
        padding: 10px 20px;
      }

      article {
        width: calc(100% - 340px);
      }
    }
  }
</style>