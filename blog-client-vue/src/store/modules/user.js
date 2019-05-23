import {
  login,
  register
} from '../../services/user';
import {
  message
} from 'ant-design-vue';
import {
  isCorrect,
  getSessionStorage,
  setSessionStorage
} from '@/utils/tools';
import userConfig from '@/config';
const userInfoKey = userConfig.userInfoKey;

export default {
  namespaced: true,
  state: {
    userInfo: getSessionStorage(userInfoKey) || {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    loginOut(state) {
      state.userInfo = {};
      setSessionStorage(userInfoKey, null)
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
        setSessionStorage(userInfoKey, res.data);
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
        setSessionStorage(userInfoKey, res.data);
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    }
  }
}