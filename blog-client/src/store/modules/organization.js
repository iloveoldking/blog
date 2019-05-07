import {
  selDepartList
} from '@/services/organization'

export default {
  namespaced: true,
  state: {
    dataList: [],
    total: 0,
    pageSize: 10,
    pageNum: 1,
    addModalShow: false
  },
  mutations: {
    setDataList(state, dataList) {
      state.dataList = dataList;
    },
    setTotal(state, total) {
      state.total = total;
    },
    setPageSize(state, pageSize) {
      state.pageNum = 1;
      state.pageSize = pageSize;
    },
    setPageNum(state, pageNum) {
      state.pageNum = pageNum;
    },
    setAddModal(state, flag) {
      state.addModalShow = flag;
    },
  },
  actions: {
    async selDepartList({
      commit,
      state
    }, params) {
      params = {
        ...params,
        pageNum: state.pageNum,
        pageSize: state.pageSize
      }
      const res = await selDepartList(params);
      const {
        list,
        total
      } = res.data;
      commit('setDataList', list)
      commit('setTotal', total)
    }
  }
}