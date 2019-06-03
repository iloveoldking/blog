import {
  message
} from 'antd'
import {
  findAll,
  findById,
  deleteArticles
} from '@/services/article';
import {
  isCorrect
} from '@/utils/tools';

export default {
  namespace: 'article',

  state: {
    data: {
      list: [],
      total: 0
    },
    pagination: {
      current: 1,
      pageSize: 10
    },
    article: {}
  },

  effects: {
    * findAll(action, effects) {
      const res = yield effects.call(findAll, action.payload);
      yield effects.put({
        type: 'setData',
        payload: res.data
      })
    },
    * findById(action, effects) {
      const res = yield effects.call(findById, action.payload);
      yield effects.put({
        type: 'setArticle',
        payload: res.data
      })
    },
    * deleteArticles(action, effects) {
      const response = yield effects.call(deleteArticles, action.payload);
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
    setArticle(state, action) {
      return {
        ...state,
        article: action.payload
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
