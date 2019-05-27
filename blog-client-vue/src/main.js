import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/reset.less'
import filters from './filters'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(CKEditor);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')