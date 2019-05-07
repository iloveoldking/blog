import {
  getValidCode,
  getVersion,
  loginByAccount
} from '@/services/login'

export default {
  namespaced: true,
  state: {
    validCodeStr: '',
    codeNum: '',
    pcVersion: '',
    pcDownload: ''
  },
  mutations: {
    setValidCodeStr(state, validCodeStr) {
      state.validCodeStr = validCodeStr;
    },
    setValidCodeNum(state, codeNum) {
      state.codeNum = codeNum;
    },
    setPcVersion(state, pcVersion) {
      state.pcVersion = pcVersion;
    },
    setPcDownload(state, pcDownload) {
      state.pcDownload = pcDownload;
    }
  },
  actions: {
    async getValidCode({
      commit
    }) {
      const res = await getValidCode();
      const {
        codeNum,
        validCodeStr
      } = res.data;
      commit('setValidCodeStr', validCodeStr)
      commit('setValidCodeNum', codeNum)
    },
    async getVersion({
      commit
    }) {
      const res = await getVersion();
      const {
        pcVersion,
        pcDownload
      } = res.data;
      commit('setPcVersion', pcVersion)
      commit('setPcDownload', pcDownload)
    },
    loginByAccount({
      commit
    }, params) {
      return loginByAccount(params);
    }
  }
}