import {
  message
} from 'antd'
import {
  findAll,
  create,
  deleteUsers
} from '@/services/user';
import {
  isCorrect
} from '@/utils/tools';

export default {
  namespace: 'user',

  state: {
    data: {
      list: [],
      total: 0
    },
    pagination: {
      current: 1,
      pageSize: 10
    }
  },

  effects: {
    * findAll(action, effects) {
      const res = yield effects.call(findAll, action.payload);
      yield effects.put({
        type: 'setData',
        payload: res.data
      })
    },
    * create(action, effects) {
      const response = yield effects.call(create, action.payload);
      if (isCorrect(response)) {
        message.success('新增成功');
        return true;
      } else {
        message.error(response.msg);
        return false;
      }
    },
    * deleteUsers(action, effects) {
      const response = yield effects.call(deleteUsers, action.payload);
      if (isCorrect(response)) {
        message.success('删除成功');
        return true;
      } else {
        message.error(response.msg);
        return false;
      }
    }
  },

  reducers: {
    setData(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.list,
          total: action.payload.total
        }
      }
    },
    setPagination(state, action) {
      return {
        ...state,
        pagination: action.payload
      }
    },
  },
};
