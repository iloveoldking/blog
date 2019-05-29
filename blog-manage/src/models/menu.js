import router from 'umi/router';
import Cookies from 'js-cookie';
import {
  message
} from 'antd';

export default {
  namespace: 'menu',

  state: {
    defaultOpenKeys: 'plat',
    selectedKeys: 'user'
  },

  reducers: {
    setOpenKeys(state, {
      payload
    }) {
      return {
        ...state,
        defaultOpenKeys: payload
      }
    },
    setSelectedKeys(state, {
      payload
    }) {
      return {
        ...state,
        selectedKeys: payload
      }
    }
  },
};
