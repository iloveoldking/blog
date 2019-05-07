<template>
  <a-layout class="basic-layout">
    <a-layout-header></a-layout-header>

    <a-layout>
      <a-layout-sider collapsible v-model="collapsed">
        <left-menu />
      </a-layout-sider>

      <a-layout-content>
        <a-breadcrumb>
          <a-breadcrumb-item>User</a-breadcrumb-item>
        </a-breadcrumb>
        
        <div class="page-content">
          
        </div>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import leftMenu from '@/components/leftMenu'
  export default {
    name: 'basicLayout',
    components: {
      leftMenu
    },
    data() {
      return {
        collapsed: false,
      }
    },
    computed: {
      ...mapState({

      })
    },
    methods: {

    }
  }
</script>

<style lang="less">
  @import './basicLayout.less';
</style>