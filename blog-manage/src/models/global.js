import router from 'umi/router';
import Cookies from 'js-cookie';
import {
  message
} from 'antd';
import {
  login
} from '@/services/user';

export default {
  namespace: 'global',

  state: {
    info: Cookies.getJSON('user') || {}
  },

  effects: {
    * login(action, {
      call,
      put
    }) {
      const response = yield call(login, action.payload);
      if (response.status === 200) {
        Cookies.set('user', response.data)
        yield put({
          type: 'setUser',
          payload: response.data,
        });
        router.push('/user');
      } else {
        message.error(response.msg);
      }
    }
  },

  reducers: {
    setUser(state, {
      payload
    }) {
      return {
        ...state,
        info: payload
      }
    }
  },
};
