import userConfig from '@/config'

const photoAddress = value => {
  return userConfig.baseURL + value;
}

const sliceOne = value => {
  if (value) {
    return value.slice(0, 1).toUpperCase()
  } else {
    return ''
  }
}

export default {
  photoAddress,
  sliceOne
}