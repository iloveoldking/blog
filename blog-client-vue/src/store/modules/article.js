import {
  getArticleList
} from '../../services/article';

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
    }
  }
}