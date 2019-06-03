const mapHrefToState = () => {
  const hrefArr = window.location.href.split('/');
  const lastOne = hrefArr[hrefArr.length - 1]
  if (/[a-zA-Z]+/.test(lastOne)) {
    return lastOne;
  } else {
    return false;
  }
}

export default {
  namespace: 'menu',

  state: {
    defaultOpenKeys: 'plat',
    selectedKeys: mapHrefToState() || 'user'
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
