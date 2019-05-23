import {
  getArticleList,
  submitArticle
} from '../../services/article';
import {
  message
} from 'ant-design-vue';
import {
  isCorrect
} from '@/utils/tools';

export default {
  namespaced: true,
  state: {
    dataList: []
  },
  mutations: {
    setDataList(state, dataList) {
      state.dataList = dataList;
    }
  },
  actions: {
    async getArticleList({
      commit,
      state
    }, params) {
      const res = await getArticleList(params);
      const {
        list
      } = res.data;
      commit('setDataList', list);
    },
    async submitArticle({
      commit,
      state
    }, params) {
      const res = await submitArticle(params);
      if (isCorrect(res)) {
        return true;
      } else {
        message.error(res.msg);
        return false;
      }
    }
  }
}