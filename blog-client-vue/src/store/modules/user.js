import {
  login,
  register,
  findById
} from '../../services/user';
import {
  message
} from 'ant-design-vue';
import {
  isCorrect
} from '@/utils/tools';
import Cookies from 'js-cookie';
import userConfig from '@/config';
const userInfoKey = userConfig.userInfoKey;

export default {
  namespaced: true,
  state: {
    userInfo: Cookies.getJSON(userInfoKey)
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    loginOut(state) {
      state.userInfo = undefined;
      Cookies.remove(userInfoKey)
    }
  },
  actions: {
    async login({
      commit,
      state
    }, params) {
      const res = await login(params);
      if (isCorrect(res)) {
        commit('setUserInfo', res.data);
        Cookies.set(userInfoKey, res.data);
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    },
    async register({
      commit,
      state
    }, params) {
      const res = await register(params);
      if (isCorrect(res)) {
        commit('setUserInfo', res.data);
        Cookies.set(userInfoKey, res.data);
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    }
  }
}