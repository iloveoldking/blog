export const getDefaultSelectedKeys = pathname => {
  const reversed = pathname.match(/\/\w+/g).reverse()
  const sliced = reversed.map(item => item.slice(1))
  return sliced[0] || ''
};

export const getDefaultOpenKeys = props => {
  const {
    location: {
      pathname
    }
  } = props;
  const reversed = pathname.match(/\/\w+/g).reverse()
  const sliced = reversed.map(item => item.slice(1))
  return sliced.filter((item, index) => index !== 0)
};
