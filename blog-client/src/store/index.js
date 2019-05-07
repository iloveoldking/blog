import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import organization from './modules/organization'
import {
  getSessionStorage
} from '../utils/tools'
import userConfig from '../config'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getSessionStorage(userConfig.userInfoKey)
  },
  mutations: {
    insertUserinfo(state, userInfo) {
      sessionStorage.setItem(userConfig.userInfoKey, JSON.stringify(userInfo));
      state.userInfo = getSessionStorage(userConfig.userInfoKey);
    }
  },
  actions: {
    //
  },
  modules: {
    login,
    organization
  }
})