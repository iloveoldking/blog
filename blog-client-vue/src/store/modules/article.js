import {
  getArticleList,
  submitArticle,
  findArticleById
} from '../../services/article';
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
      const userInfo = Cookies.getJSON(userInfoKey);
      let paramsReal = {
        ...params,
        pageSize: state.pageSize,
        pageNum: state.pageNum
      };
      if (userInfo) {
        paramsReal.userId = userInfo._id
      }
      const res = await getArticleList(paramsReal);
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
    },
    async updateCurrentArticle({
      commit,
      state
    }, params) {
      const userInfo = Cookies.getJSON(userInfoKey);
      const {
        index,
        _id
      } = params;
      let paramsReal = {
        id: _id
      }
      if (userInfo) {
        paramsReal.userId = userInfo._id
      }
      const res = await findArticleById(paramsReal);
      state.dataList.splice(index, 1, res.data)
    }
  }
}