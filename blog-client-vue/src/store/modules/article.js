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
    dataList: [],
    total: 0,
    pageSize: 9,
    pageNum: 1
  },
  mutations: {
    setDataList(state, dataList) {
      state.dataList = dataList;
    },
    setTotal(state, total) {
      state.total = total;
    },
    setPageNum(state, pageNum) {
      state.pageNum = pageNum;
    }
  },
  actions: {
    async getArticleList({
      commit,
      state
    }, params) {
      const res = await getArticleList({
        ...params,
        pageSize: state.pageSize,
        pageNum: state.pageNum
      });
      const {
        list,
        total
      } = res.data;
      commit('setDataList', list);
      commit('setTotal', total);
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